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

          <button className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-dark" onClick={onClickHomeBtn}>
                  Home
                </button>
              </div>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">
                Transactions
              </div>

              <div className="navbar-dropdown">
                <div className="navbar-item">
                  <button className="button is-white" onClick={onClickAddTransactionBtn}>
                    Add new
                  </button>
                </div>
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
              <button className="button" onClick={onClickPrevWeekBtn}>
                &lt;
              </button>
              <button className="button is-primary" onClick={onClickCurrentWeekBtn}>
                Today
              </button>
              <button className="button" onClick={onClickNextWeekBtn}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
