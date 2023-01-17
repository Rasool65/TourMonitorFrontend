import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Power } from 'react-feather';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import defaultAvatar from '../../../assets/images/avatars/avatar-blank.png';
import { handleLogout } from '@src/redux/reducers/authenticationReducer';
import { RootStateType } from '@src/redux/Store';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const authenticationStore = useSelector((state: RootStateType) => state.authentication);

  const userAvatar = defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{authenticationStore.username}</span>
          <span className="user-status"></span>
        </div>
        <Avatar imgClassName="" className="" img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
