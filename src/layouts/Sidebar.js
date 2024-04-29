import { Button, Nav, NavItem } from 'reactstrap';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  {
    title: 'Dashboard',
    href: '/starter',
    icon: 'bi bi-speedometer2',
  },
  {
    title: 'Category',
    href: '/category',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Item',
    href: '/item',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Party',
    href: '/party',
    icon: 'bi bi-card-text',
  },
  {
    title: 'FeeHead',
    href: '/FeeHead',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Circle Master',
    href: '/Circle',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Admission Master',
    href: '/Admission',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Fee Slab Master',
    href: '/Slab',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Fee Group Master',
    href: '/Fee_Group_Master_Search_Screen',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Class Master',
    href: '/Class_Master_Search_Screen',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Tc Issue Master',
    href: '/Tc_Issue_Master_Detail_Search_Screen',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Fee Reciept Master',
    href: '/Fee_Reciept_Master_Search',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Subject Master',
    href: '/Subject_Master_Search',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Class Detail Master',
    href: '/Class_Detail_Master_Search',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Result Master',
    href: '/Result_Master_New_Search',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Report',
    href: '/AdmisionReports',
    icon: 'bi bi-card-text',
  },
  {
    title: 'System Record',
    href: '/SystemRecords',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Multi Purpose Master',
    href: '/Multi_Purpose_Type_Master_Search',
    icon: 'bi bi-card-text',
  },

  {
    title: 'Add Sale',
    href: '/addsale',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Sale Detail',
    href: '/saledetail',
    icon: 'bi bi-card-text',
  },

  {
    title: 'Alert',
    href: '/alerts',
    icon: 'bi bi-bell',
  },
  {
    title: 'Badges',
    href: '/badges',
    icon: 'bi bi-patch-check',
  },
  {
    title: 'Buttons',
    href: '/buttons',
    icon: 'bi bi-hdd-stack',
  },
  {
    title: 'Cards',
    href: '/cards',
    icon: 'bi bi-card-text',
  },
  {
    title: 'Grid',
    href: '/grid',
    icon: 'bi bi-columns',
  },
  {
    title: 'Table',
    href: '/table',
    icon: 'bi bi-layout-split',
  },
  {
    title: 'Forms',
    href: '/forms',
    icon: 'bi bi-textarea-resize',
  },
  {
    title: 'Breadcrumbs',
    href: '/breadcrumbs',
    icon: 'bi bi-link',
  },
  // {
  //   title: "About",
  //   href: "/about",
  //   icon: "bi bi-people",
  // },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById('sidebarArea').classList.toggle('showSidebar');
  };
  let location = useLocation();

  return (
    <div className='p-3'>
      <div className='d-flex align-items-center'>
        {/* <Logo /> */}
        {/* <h2>SHIVKMS</h2> */}
        <span className='ms-auto d-lg-none'>
          <Button
            close
            size='sm'
            className='ms-auto d-lg-none'
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className='pt-4 mt-2'>
        <Nav vertical className='sidebarNav'>
          {navigation.map((navi, index) => (
            <NavItem key={index} className='sidenav-bg'>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? 'text-primary nav-link py-3'
                    : 'nav-link text-secondary py-3'
                }
              >
                <i className={navi.icon}></i>
                <span className='ms-3 d-inline-block'>{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
