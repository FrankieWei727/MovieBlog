import React, {Component} from 'react';
import {Button, Col, Icon, List, Row, Skeleton, Affix, Typography} from "antd";
import {Link} from "react-router-dom";
import AvatarFlow from "./AvatarFlow";
import moment from "moment";

const {Paragraph} = Typography;
const briefLength = 350;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1621723_xyv7nayrgmr.js"
});

class Article extends Component {

    constructor(props) {
        super(props);
        this.myDiv = React.createRef()
    }


    state = {
        isExtractBrief: true,
        height: window.innerHeight,
        affixed: "",
        style: [],
        position: "",
    };

    getOffset = () => {
        console.log(this.myDiv.current.offsetTop);
        this.setState({
            position: this.myDiv.current.offsetTop
        })
    };

    extractText = HTMLString => {
        let span = document.createElement("span");
        span.innerHTML = HTMLString;
        return span.textContent || span.innerText;
    };

    extractBrief = HTMLString => {
        const text = this.extractText(HTMLString);
        // const text = HTMLString;
        if (text.length > briefLength) {
            return text.slice(0, briefLength) + "……";
        }
        return text;
    };

    SetTextState = () => {
        const {isExtractBrief} = this.state;
        if (isExtractBrief === true) {
            this.setState({
                isExtractBrief: false
            })
        } else {
            this.setState({
                isExtractBrief: true
            })
        }
    };

    handleAffix = async (value) => {
        await this.setState({
            affixed: value
        });
        if (this.state.affixed === true) {
            this.setState({
                style: {
                    paddingTop: '10px',
                    backgroundColor: "white",
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderColor: '#CFCFCF transparent transparent transparent'
                }
            })
        } else {
            this.setState({
                style: {
                    paddingTop: '10px',
                    backgroundColor: "white",
                }
            })
        }

    };


    render() {
        const {item, userId} = this.props;
        const {isExtractBrief} = this.state;
        return (
            <List.Item>
                <div ref={this.myDiv}
                    // ref={node => {
                    //     this.container = node;
                    // }}
                     style={
                         item.originality === "Y"
                             ? {
                                 borderLeft: "8px solid",
                                 borderColor: "#269f42",
                                 paddingLeft: "15px"
                             }
                             : {}
                     }>
                    <Link to={"/article/" + item.id}>
                        <h3 style={{
                            color: "#1a1a1a",
                            fontWeight: "600",
                            fontSize: "18px",
                            fontStretch: "100%",
                            padding: '0 20px',
                            paddingBottom: '5px'
                        }}
                        >
                            {item.title}
                        </h3>
                    </Link>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <Row type="flex" style={{paddingTop: '10px', padding: '0 20px'}} justify="start">
                            <Col span={21}>
                                <List.Item.Meta
                                    title={
                                        <Link
                                            to={
                                                (item.author && (item.author.id === userId)
                                                    ? "/profile/"
                                                    : "/visit/profile/" + item.author.id)
                                            }
                                        >
                                            <div>
                                                {item.author && item.author.username}
                                                {(item.author &&
                                                    item.author.profile.permission) ===
                                                "reviewed" ? (
                                                    <IconFont
                                                        type="iconbadge"
                                                        style={{paddingLeft: "10px"}}
                                                    />
                                                ) : null}
                                            </div>
                                        </Link>
                                    }
                                    avatar={<AvatarFlow kwy={'avatarFlow'} author={item.author}
                                                        userId={userId}/>}
                                />
                            </Col>
                            <Col span={3}>
                                {item.created && moment(moment(item.created).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss").fromNow()}
                            </Col>
                        </Row>
                        <div style={{color: "#646464", fontSize: "15px", padding: '0 20px'}}>
                            {isExtractBrief ?
                                <div>
                                    <Paragraph ellipsis={{rows: 3, expandable: {isExtractBrief}}}
                                               onClick={this.SetTextState}>
                                        {this.extractText(item.content)}
                                    </Paragraph>
                                </div> :
                                <div>
                                    <div className='braft-output-content' style={{overflow: 'auto'}}
                                         dangerouslySetInnerHTML={{__html: item.content}}/>
                                </div>
                            }
                        </div>
                        <div>
                            {isExtractBrief ?
                                <Row type="flex" justify="start" style={{paddingTop: '10px', backgroundColor: "white"}}>
                                    <Col span={20}>
                                        <Col span={5} offset={1} order={1} style={{color: "#76839b"}}>
                                            <IconFont type="iconliulan"/> Views {item.views}
                                        </Col>
                                        <Col span={5} order={2}>
                                            {/*3 col-order-2*/}
                                        </Col>
                                        <Col span={5} order={3}>
                                            {/*3 col-order-3*/}
                                        </Col>
                                        <Col span={5} order={4}>
                                            {/*3 col-order-3*/}
                                        </Col>
                                    </Col>
                                    <Col span={4}>
                                        <Col span={24} offset={1} order={1}>
                                            <div style={{alignItems: 'right'}}>
                                                {isExtractBrief === false ?
                                                    <Button type="link" onClick={this.SetTextState}>
                                                        Collapse <Icon type="up-circle"/>
                                                    </Button> :
                                                    null
                                                }
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                                :
                                <Affix offsetBottom={0} onChange={affixed => this.handleAffix(affixed)}>
                                    <Row type="flex" justify="start" style={this.state.style}>
                                        <Col span={20}>
                                            <Col span={5} offset={1} order={1} style={{color: "#76839b"}}>
                                                <IconFont type="iconliulan"/> Views {item.views}
                                            </Col>
                                            <Col span={5} order={2}>
                                                {/*3 col-order-2*/}
                                            </Col>
                                            <Col span={5} order={3}>
                                                {/*3 col-order-3*/}
                                            </Col>
                                            <Col span={5} order={4}>
                                                {/*3 col-order-3*/}
                                            </Col>
                                        </Col>
                                        <Col span={4}>
                                            <Col span={24} offset={1} order={1}>
                                                <div style={{alignItems: 'right'}}>
                                                    {isExtractBrief === false ?
                                                        <Button type="link" onClick={this.SetTextState}>
                                                            Collapse <Icon type="up-circle"/>
                                                        </Button> :
                                                        null
                                                    }
                                                </div>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Affix>
                            }
                        </div>
                    </Skeleton>
                </div>
            </List.Item>
        )
    }
}

export default Article