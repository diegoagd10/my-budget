import './Wait.css';

export default function Wait() {
  return (
    <section className="Wait-main">
      <div className="container is-flex is-align-items-center">
        <progress
          className="progress is-primary" max="100">
          15%
        </progress>
      </div>
    </section>
  );
}