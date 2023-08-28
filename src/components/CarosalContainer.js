import React from "react";

const CorosalContainer = (props) => {
  return (
    <section className={props.class1}>
      <div className="h-1 .container">{props.children}</div>
    </section>
  );
};

export default CorosalContainer;

