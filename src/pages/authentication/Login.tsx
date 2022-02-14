import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_LOGIN, URL_MAIN } from '../../configs/urls';
import IPageProps from '../../configs/routerConfig/IPageProps';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '@components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Styles
import '@styles/react/pages/page-authentication.scss';

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Facebook, GitHub, HelpCircle, Mail, Twitter } from 'react-feather';
import { useSkin } from '@src/hooks/useSkin';
import { useTokenAuthentication } from '@src/hooks/useTokenAuthentication';
import { LoginModelSchema, ILoginModel } from '@src/models/input/authentication/ILoginModel';
import useHttpRequest from '@src/hooks/useHttpRequest';
import { APIURL_LOGIN } from '@src/configs/apiConfig/apiUrls';
import { useToast } from '@src/hooks/useToast';
import { useDispatch } from 'react-redux';
import { handleLogin } from '@src/redux/reducers/authenticationReducer';
import logo from '@src/assets/images/logo/bonnychow_80.png';
import themeConfig from '@src/configs/theme/themeConfig';
import { ILoginResultModel } from '@src/models/output/authentication/ILoginResultModel';
import { IOutputResult } from '@src/models/output/IOutputResult';

const Login: FunctionComponent<IPageProps> = (props) => {
  const navigate = useNavigate();
  const tokenAuthentication = useTokenAuthentication();
  const dispatch = useDispatch();

  const { skin } = useSkin();

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg';
  const source = require(`@src/assets/images/pages/${illustration}`);
  const httpRequest = useHttpRequest();
  const toast = useToast();

  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginModel>({ mode: 'onChange', resolver: yupResolver(LoginModelSchema) });

  const onSubmit = (data: ILoginModel) => {
    if (data) {
      httpRequest
        .postRequest<IOutputResult<ILoginResultModel>>(APIURL_LOGIN, { username: data.userName, password: data.password })
        .then((result) => {
          dispatch(handleLogin(result));
          navigate(URL_MAIN);
        });
    }
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col className="d-flex align-items-center auth-bg px-2 p-lg-5" lg="4" sm="12">
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <div className="w-100 justify-content-center text-center">
              <img className="img-fluid" src={logo} alt="Solico" />
            </div>
            <CardTitle tag="h4" className="fw-bold mb-1 mt-2 text-center text-primary">
              {themeConfig.app.appName}
            </CardTitle>
            {/* <CardText className="mb-2">Please sign-in to your account and start the adventure</CardText> */}
            {/* <Alert color="primary">
              <div className="alert-body font-small-2">
                <p>
                  <small className="me-50">
                    <span className="fw-bold">Admin:</span> admin@demo.com | admin
                  </small>
                </p>
                <p>
                  <small className="me-50">
                    <span className="fw-bold">Client:</span> client@demo.com | client
                  </small>
                </p>
              </div>
              <HelpCircle id="login-tip" className="position-absolute" size={18} style={{ top: '10px', right: '10px' }} />
              <UncontrolledTooltip target="login-tip" placement="left">
                This is just for ACL demo purpose.
              </UncontrolledTooltip>
            </Alert> */}
            <Form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="login-username">
                  UserName
                </Label>
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type="text"
                      placeholder="UserName"
                      autoComplete="off"
                      invalid={errors.userName && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      inputClassName=""
                      className="input-group-merge"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                Sign in
              </Button>
            </Form>
            {/* <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
