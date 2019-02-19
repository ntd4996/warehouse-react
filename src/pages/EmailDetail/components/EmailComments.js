import { Component } from "react";
import styles from "../EmailDetail.less";
import { Button, Icon, Input } from "antd";
import React from "react";

class EmailComments extends Component {
  render() {
    const {comments} = this.props;

    return(
      <div className={styles.commentContainer}>
        <div className={styles.commentTitle}>
          <Icon type='message' theme='filled' />
          <span>Comments ({comments.length})</span>
        </div>
        {
          (comments && comments.length) &&
          <div className={styles.commentBoxWrap}>
            <div className={styles.commentListWrap}>
              {
                comments.map(
                  (comment) => (
                    <div className={styles.commentItem} key={comment.id}>
                      <div className={styles.commentAvatar}>
                        <span>{comment.user.shortName}</span>
                      </div>
                      <div className={styles.commentContentWrap}>
                        <div className={styles.commentHeader}>
                          <span>{comment.user.fullName}</span>
                          <i>{comment.createdAt}</i>
                        </div>
                        <div className={styles.commentBody}>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  )
                )
              }
            </div>
            <div className={styles.commentForm}>
              <form>
                <Input prefix={<Icon type="align-left" />} placeholder="Enter your comment here..." />
                <Button type="primary" icon="arrow-right" />
              </form>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default EmailComments;
