import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '@components/avatar';
import { useDispatch } from 'react-redux';
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import defaultAvatar from '../../../assets/images/portrait/small/avatar-s-11.jpg';
import { handleLogout } from '@src/redux/reducers/authenticationReducer';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fakeUserData = {
      id: 1,
      fullName: 'Rasool Aghajani',
      username: 'Rasool65',
      avatar: '/static/media/avatar-s-11.1d46cc62.jpg',
      email: 'admin@demo.com',
      role: 'admin',
      ability: [{ action: 'manage', subject: 'all' }],
      extras: { eCommerceCartItemsCount: 5 },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQwODU0MTM3LCJleHAiOjE2NDA4NTQ3Mzd9.oK4m0SCBJs3hnZg_FRFT_m9xK-Ora11GQkkE-JQZOws',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQwODU0MTM3LCJleHAiOjE2NDA4NTQ3Mzd9.VuI-SYcoLebKDhOwmDV0uK6O6B9vGXLRP-oqLbJ2mvY',
    };
    // if (isUserLoggedIn() !== null) {
    // setUserData(JSON.parse(localStorage.getItem('userData')))
    // }
    setUserData(fakeUserData);
  }, []);

  const userAvatar = (userData && userData.avatar) || defaultAvatar;
  console.log(userData);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{(userData && userData['username']) || 'John Doe'}</span>
          <span className="user-status">{(userData && userData.role) || 'Admin'}</span>
        </div>
        <Avatar imgClassName="" className="" img={defaultAvatar} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to="/pages/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/email">
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/todo">
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/chat">
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/pages/account-settings">
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/pages/pricing">
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/pages/faq">
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
