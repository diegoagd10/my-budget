import './Navbar.css';

function Navbar({
  periodText,
  onClickHomeBtn,
  onClickAddTransactionBtn,
  onClickPrevWeekBtn,
  onClickCurrentWeekBtn,
  onClickNextWeekBtn
}) {
  return (
    <header className="Navbar-main">
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">

        <div className="navbar-brand is-white">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo-white.png" width="112" height="28" alt="No logo" />
          </a>

          <a role="button" href="#" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="#" className="navbar-item" onClick={onClickHomeBtn}>
              Home
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a href="#" className="navbar-link">
                Transactions
              </a>

              <div className="navbar-dropdown">
                <a href="#" className="navbar-item" onClick={onClickAddTransactionBtn}>
                  Add new
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <h2 className="title is-4" style={{ color: "white" }}>
              Period: {periodText}
            </h2>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <a href="#" className="button" onClick={onClickPrevWeekBtn}>
                &lt;
              </a>
              <a href="#" className="button is-primary" onClick={onClickCurrentWeekBtn}>
                Today
              </a>
              <a href="#" className="button" onClick={onClickNextWeekBtn}>
                &gt;
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
