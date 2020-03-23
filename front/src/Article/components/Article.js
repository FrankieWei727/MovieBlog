import React, {useEffect, useState} from 'react';
import {Button, Col, Icon, List, Row, Skeleton, Affix, Typography} from "antd";
import {Link} from "react-router-dom";
import AvatarFlow from "./AvatarFlow";
import moment from "moment";

const {Paragraph} = Typography;
// const briefLength = 350;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_1621723_xyv7nayrgmr.js"
});

const Article = (props) => {


    const [selector] = useState(React.createRef());
    const [isExtractBrief, setIsExtractBrief] = useState(true);
    const [affixed, setAffixed] = useState("");
    const [style, setStyle] = useState([]);

    useEffect(() => {

        if (selector.current !== null) {

            selector.current.addEventListener('selector', () => {
                const rect = selector.current.getBoundingClientRect();
                console.log(rect, selector);
                console.log('selector')
            });
        }

    });

    const extractText = HTMLString => {
        let span = document.createElement("span");
        span.innerHTML = HTMLString;
        return span.textContent || span.innerText;
    };

    // const extractBrief = HTMLString => {
    //     const text = extractText(HTMLString);
    //     const text = HTMLString;
    //     if (text.length > briefLength) {
    //         return text.slice(0, briefLength) + "……";
    //     }
    //     return text;
    // };

    const SetTextState = () => {
        setIsExtractBrief(!isExtractBrief);
    };


    const handleAffix = async (value) => {
        await setAffixed(value);
        if (affixed === true) {
            setStyle({
                paddingTop: '10px',
                backgroundColor: "white",
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: '#CFCFCF transparent transparent transparent'
            });

        } else {
            setStyle({
                paddingTop: '10px',
                backgroundColor: "white",
            });
        }

    };

    return (
        <Skeleton loading={props.item.loading} active>
            <List.Item>
                <div
                    ref={selector}
                    style={
                        props.item.originality === "Y"
                            ? {
                                borderLeft: "8px solid",
                                borderColor: "#269f42",
                                paddingLeft: "15px"
                            }
                            : {}
                    }>
                    <Link to={"/article/" + props.item.id}>
                        <h3 style={{
                            color: "#1a1a1a",
                            fontWeight: "600",
                            fontSize: "18px",
                            fontStretch: "100%",
                            padding: '0 20px',
                            paddingBottom: '5px'
                        }}
                        >
                            {props.item.title}
                        </h3>
                    </Link>
                    <Skeleton avatar title={false} loading={props.item.loading} active>
                        <Row style={{paddingTop: '10px', padding: '0 20px'}} justify="start">
                            <Col span={21}>
                                <List.Item.Meta
                                    title={
                                        <Link
                                            to={
                                                (props.item.author && (props.item.author.id === props.userId)
                                                    ? "/profile/"
                                                    : "/visit/profile/" + props.item.author.id)
                                            }
                                        >
                                            <div>
                                                {props.item.author && props.item.author.username}
                                                {(props.item.author &&
                                                    props.item.author.profile.permission) ===
                                                "reviewed" ? (
                                                    <IconFont
                                                        type="iconbadge"
                                                        style={{paddingLeft: "10px"}}
                                                    />
                                                ) : null}
                                            </div>
                                        </Link>
                                    }
                                    avatar={<AvatarFlow kwy={'avatarFlow'} author={props.item.author}
                                                        userId={props.userId}/>}
                                />
                            </Col>
                            <Col xs={22} sm={3} style={{marginBottom: '5px'}}>
                                {props.item.created && moment(moment(props.item.created).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss").fromNow()}
                            </Col>
                        </Row>
                        <div style={{color: "#646464", fontSize: "15px", padding: '0 20px'}}>
                            {isExtractBrief ?
                                <div>
                                    <Paragraph ellipsis={{rows: 3, expandable: {isExtractBrief}}}
                                               onClick={SetTextState}>
                                        {extractText(props.item.content)}
                                    </Paragraph>
                                </div> :
                                <div>
                                    <div className='braft-output-content' style={{overflow: 'auto'}}
                                         dangerouslySetInnerHTML={{__html: props.item.content}}/>
                                    <div
                                        style={{
                                            paddingTop: '5vw',
                                            paddingBottom: '1vw',
                                            fontWeight: 'bold',
                                            color: '#373737'
                                        }}>Publish: {moment(props.item.created).format('LL')}
                                    </div>
                                </div>
                            }
                        </div>
                        <div>
                            {isExtractBrief ?
                                <Row type="flex" justify="start"
                                     style={{paddingTop: '10px', backgroundColor: "white"}}>
                                    <Col xs={{span: 16, offset: 1}} sm={20}>
                                        <IconFont style={{color: "#76839b"}}
                                                  type="iconliulan"/> Views {props.item.views}
                                    </Col>
                                    <Col xs={4} sm={4}>
                                        {isExtractBrief === false ?
                                            <Button type="link" onClick={SetTextState}>
                                                Collapse <Icon type="up-circle"/>
                                            </Button> :
                                            null
                                        }
                                    </Col>
                                </Row>
                                :
                                <Affix offsetBottom={0}
                                       onChange={affixed => handleAffix(affixed)}>
                                    <Row type="flex" justify="start" style={style}>
                                        <Col xs={{span: 16, offset: 1}} sm={20}>
                                            <IconFont style={{color: "#76839b"}}
                                                      type="iconliulan"/> Views {props.item.views}
                                        </Col>
                                        <Col xs={4} sm={4}>
                                            {isExtractBrief === false ?
                                                <Button type="link" onClick={SetTextState}>
                                                    Collapse <Icon type="up-circle"/>
                                                </Button> :
                                                null
                                            }
                                        </Col>
                                    </Row>
                                </Affix>}
                        </div>
                    </Skeleton>
                </div>
            </List.Item>
        </Skeleton>
    )
};

export default Article