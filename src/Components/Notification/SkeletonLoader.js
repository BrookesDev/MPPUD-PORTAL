import React from "react";
import classes from "./Notification.module.css"; 

const SkeletonLoader = () => {
  return (
    <div>
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className={classes.skeletonNotification}>
          <div className={classes.skeletonIcon}></div>
          <div className={classes.skeletonText}>
            <div className={classes.skeletonLine}></div>
            <div className={classes.skeletonLineSmall}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
