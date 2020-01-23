import React, {Component} from "react";
import {Avatar, Popover, Tag} from "antd";
import {Link} from "react-router-dom";

const Content = props => (
    <div style={{display: "flex", flexDirection: "column", width: "360px"}}>
        <div
            style={{
                backgroundImage: `url(${props.user.profile.cover})`,
                backgroundSize: "cover",
                height: "100px"
            }}
        />
        <div style={{display: "flex"}}>
            <Avatar
                icon="user"
                shape="square"
                size={72}
                src={props.user.profile.avatar}
                style={{marginTop: "-24px", marginLeft: "30px", border: '3px solid white'}}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "12px",
                    marginTop: "2px"
                }}
            >
                <div
                    style={{
                        fontWeight: "bolder",
                        fontSize: "18px"
                    }}
                >
                    {props.user.username}
                </div>
                <div>
                    {props.user.profile.bio &&
                    props.user.profile.bio.slice(0, 14) + "..."}
                </div>
            </div>
        </div>
        <div style={{padding: "20px 30px"}}>
            {props.user.profile.profession && (
                <Tag color="#f50" style={{height: "26px", fontSize: "16px"}}>
                    {props.user.profile.profession}
                </Tag>
            )}
        </div>
    </div>
);

class AvatarFlow extends Component {
    state = {
        follow: false,
        loading: false
    };

    render() {
        return (
            <Popover
                content={<Content {...this.props}/>}
                trigger="hover"
                placement="topLeft"
            >
                <div>
                    <Link
                        to={
                            ((this.props.user && this.props.user.id) + "" ===
                            window.localStorage.getItem("user_id")
                                ? "/profile/"
                                : "/visit/") + (this.props.user && this.props.user.id)
                        }
                    >
                        <Avatar
                            shape="square"
                            icon="user"
                            src={this.props.user && this.props.user.profile.avatar}
                        />
                    </Link>
                </div>
            </Popover>
        );
    }
}

export default AvatarFlow;
