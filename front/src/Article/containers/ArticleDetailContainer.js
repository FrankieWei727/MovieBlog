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
                "http://127.0.0.1:8000/api/comment/articles/" + this.props.match.params.articleID
            )
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
            <Layout style={{minHeight: '100vh', backgroundColor: '#fff'}}>
                <BackTop/>
                <Row style={{
                    background: '#fff',
                    padding: '20px 60px',
                    marginBottom: '15px',
                    boxShadow: '0px 2px 2px #888888'
                }}>
                    <Col xxl={{span: 10, offset: 5}} xl={{span: 13, offset: 2}} md={{span: 14, offset: 1}}
                         xs={{span: 22, offset: 1}}>
                        <div style={{fontSize: '22px', fontWeight: 'bold', color: 'black'}}>
                            <Paragraph ellipsis={{rows: 1, expandable: true}} strong style={{color: 'black'}}>
                                {this.state.title}
                            </Paragraph>
                        </div>
                    </Col>
                    <Col xxl={{span: 4, offset: 0}} xl={{span: 6, offset: 1}} md={{span: 7, offset: 1}}
                         xs={{span: 22, offset: 1}} style={{paddingLeft: '15px'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <Statistic title='View' suffix='times' value={this.state.views}/>
                            <Statistic title='Published date'
                                       value={moment(moment(this.state.created).format('YYYY-MM-DD HH:mm:ss'), "YYYY-MM-DD HH:mm:ss").fromNow()}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{flex: '1 0', padding: '0 60px'}}>
                    <Col xxl={{span: 10, offset: 5}} xl={{span: 14, offset: 2}} md={{span: 15, offset: 1}}
                         xs={{span: 22, offset: 1}}>
                        <div type='flex'
                             style={{flex: '1 0', background: '#fff', padding: '10px 0', marginBottom: '20px'}}>
                            <div style={{fontSize: '16px'}}>
                                <div className='braft-output-content' style={{overflow: 'auto'}}
                                     dangerouslySetInnerHTML={{__html: this.state.content}}/>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Spin spinning={this.state.loading} size='large' tip='loading...'/>
                            </div>
                            <Title level={4} style={{paddingTop: '50px'}}>Comment</Title>
                            <CreateArticleComment articleId={this.state.id} articleUrl={this.state.url}/>
                        </div>
                    </Col>
                    <Col xxl={{span: 4, offset: 0}} xl={{span: 6, offset: 0}} md={{span: 7, offset: 0}}
                         xs={{span: 22, offset: 1}} style={{paddingBottom: '20px', paddingLeft: '15px'}}>
                        <Affix offsetTop={0} style={{paddingTop: '30px'}}>
                            <AuthorInfo authorId={this.state.authorId}/>
                        </Affix>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default Form.create()(ArticlePage)
