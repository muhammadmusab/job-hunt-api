import '../src/scss/main.scss';

export default {
  decorators: [
    (Component) => (
      <div style={{ margin: "3em" }}>
        <Component />
      </div>
    ),
  ] 
};