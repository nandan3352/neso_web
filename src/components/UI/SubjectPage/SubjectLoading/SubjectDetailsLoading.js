import React from 'react';
import './SubjectLoading.css';
import { Skeleton } from '@material-ui/lab';
function SubjectDetailsLoading(props) {
  return (
    <div className="loading-left-section-two">
      <div className="loading-other">
        <Skeleton variant="rect" className="loading-detail" />
        <Skeleton variant="rect" className="loading-detail" />
        <Skeleton variant="rect" className="loading-detail" />
        <Skeleton variant="rect" className="loading-detail" />
        <Skeleton variant="rect" className="loading-detail" />
        <Skeleton variant="rect" className="loading-detail" />
      </div>
    </div>
  );
}

export default SubjectDetailsLoading