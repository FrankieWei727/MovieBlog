import React, {Component} from 'react'
import {Row, Col, Layout, Form, Spin, Affix, Typography, BackTop, Statistic} from 'antd'
import axios from 'axios'
import 'braft-editor/dist/output.css'
import moment from "moment";

import AuthorInfo from "../components/AuthorInfo";
import CreateArticleComment from "../components/CreateArticleComment";

const {Paragraph} = Typography;
const {Title} = Typography;

class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'loading...',
            content: '',
            id: '',
            url: '',
            translationList: [],
            visible: false,
            modalTitle: '',
            modalContent: '',
            loading: true,
            authorId: '',
            pubDate: '',
            views: 0
        }
    }

    componentDidMount = async (v) => {
        await this.getArticle()
    };

    getArticle = async (v) => {
        try {
            const response = await axios.get(
                "api/comment/articles/" + this.props.match.params.articleID
            );
            this.setState(function (state) {
                return {
                    title: response.data.title,
                    content: response.data.content,
                    id: response.data.id,
                    url: response.data.url,
                    loading: false,
                    authorId: response.data.author.id,
                    created: response.data.created,
                    views: response.data.views
                }
            })
        } catch (error) {
            console.log(error)
        }
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        })
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        })
    };

    render() {
        return (
            <Layout style={{backgroundColor: '#fff'}}>
                <BackTop/>
                <Row style={{
                    background: '#fff',
                    padding: '20px 0',
                    marginBottom: '15px',
                    boxShadow: '0px 2px 2px #888888'
                }}>
                    <Col xxl={{span: 12, offset: 4}}
                         xl={{span: 14, offset: 2}}
                         lg={{span: 14, offset: 2}}
                         md={{span: 14, offset: 1}}
                         xs={{span: 22, offset: 1}}>
                        <div style={{fontSize: '22px', fontWeight: 'bold', color: 'black'}}>
                            <Paragraph ellipsis={{rows: 1, expandable: true}} strong style={{color: 'black'}}>
                                {this.state.title}
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xxl={{span: 4, offset: 0}}
                         xl={{span: 6, offset: 0}}
                         lg={{span: 6, offset: 0}}
                         md={{span: 7, offset: 0}}
                         xs={{span: 22, offset: 1}}
                    >
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Statistic title='View' suffix='times' value={this.state.views}/>
                            <Statistic title='Published date'
                                       value={moment(moment(this.state.created).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss").fromNow()}/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[{xs: 0, sm: 0, md: 24}, {xs: 16, sm: 16, md: 0}]}>
                    <Col
                        xxl={{span: 12, offset: 4}}
                        xl={{span: 14, offset: 2}}
                        lg={{span: 14, offset: 2}}
                        md={{span: 14, offset: 1, order: 1}}
                        xs={{span: 22, offset: 1, order: 2}}>
                        <div>
                            <div style={{fontSize: '16px'}}>
                                <div className='braft-output-content' style={{overflow: 'auto'}}
                                     dangerouslySetInnerHTML={{__html: this.state.content}}/>
                            </div>
                            <div
                                style={{
                                    paddingTop: '5vw',
                                    paddingBottom: '1vw',
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                    color: '#373737'
                                }}>Publish: {moment(this.state.created).format('LL')}
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Spin spinning={this.state.loading} size='large' tip='loading...'/>
                            </div>
                            <div>
                                <Title level={4} style={{paddingTop: '50px'}}>Comment</Title>
                                <CreateArticleComment articleId={this.state.id} articleUrl={this.state.url}/>
                            </div>
                        </div>
                    </Col>
                    <Col
                        xxl={{span: 4, offset: 0}}
                        xl={{span: 6, offset: 0}}
                        lg={{span: 6, offset: 0}}
                        md={{span: 7, offset: 0, order: 2}}
                        xs={{span: 22, offset: 1, order: 1}}
                    >
                        <Affix offsetTop={100} style={{paddingTop: '60px'}}>
                            <AuthorInfo authorId={this.state.authorId}/>
                        </Affix>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Form.create()(ArticlePage)
