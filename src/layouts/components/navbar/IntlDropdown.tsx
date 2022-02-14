import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

const IntlDropdown = () => {
  const { i18n } = useTranslation();
  const langObj: any = {
    ir: 'Persian',
    sa: 'Arabic',
    en: 'English',
  };

  const handleLangUpdate = (e: any, lang: any) => {
    e.preventDefault();
    i18n.changeLanguage(lang);
  };

  return (
    <UncontrolledDropdown href="/" tag="li" className="dropdown-language nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link" onClick={(e) => e.preventDefault()}>
        <ReactCountryFlag svg className="country-flag flag-icon" countryCode={i18n.language === 'en' ? 'us' : i18n.language} />
        <span className="selected-language">{langObj[i18n.language]}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" end>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, 'ir')}>
          <ReactCountryFlag className="country-flag" countryCode="ir" svg />
          <span className="ms-1">Persian</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, 'en')}>
          <ReactCountryFlag className="country-flag" countryCode="us" svg />
          <span className="ms-1">English</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, 'sa')}>
          <ReactCountryFlag className="country-flag" countryCode="sa" svg />
          <span className="ms-1">Arabic</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default IntlDropdown;
