function Footer() {
  return (
    <footer className='py-3 my-4'>
      <ul className='nav justify-content-center border-bottom pb-3 mb-3'>
        <li className='nav-item'>
          <span className='nav-link px-2 text-muted'>Home</span>
        </li>
        <li className='nav-item'>
          <span className='nav-link px-2 text-muted'>Features</span>
        </li>
        <li className='nav-item'>
          <span className='nav-link px-2 text-muted'>Pricing</span>
        </li>
        <li className='nav-item'>
          <span className='nav-link px-2 text-muted'>FAQs</span>
        </li>
        <li className='nav-item'>
          <span className='nav-link px-2 text-muted'>About</span>
        </li>
      </ul>
      <p className='text-center text-muted'>
        © {new Date().getFullYear()} Company, Inc
      </p>
    </footer>
  );
}

export default Footer;
