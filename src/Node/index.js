import Styles from './style.module.css'

const Node = (props) => {
  const { name } = props;

  return (
    <div className={Styles.container}>
      <span>{name}</span>
    </div>
  );
};

export default Node;
