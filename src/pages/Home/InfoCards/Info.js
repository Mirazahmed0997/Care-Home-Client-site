import React from 'react';

const Info = ({card}) => {
    const {name,Description,icon,bgClass}=card;
    return (
        <div className={`card card-side text-white p-6 shadow-xl ${bgClass}`}>
        <figure><img src={icon} alt="Movie"/></figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{Description}</p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
    );
};

export default Info;