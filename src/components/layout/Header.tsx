import logo from '../../assets/icons/logo.svg';
import { UnitsDropdown } from '../ui/Dropdown';
import Container from './Container';

export default function Header() {
  return (
    <header>
      <Container>
        <div className='flex items-center justify-between py-6'>
          <a href='/'>
            <img src={logo} alt='Weather Now Logo' className='w-38 md:w-48' />
          </a>
          <UnitsDropdown />
        </div>
      </Container>
    </header>
  );
}
