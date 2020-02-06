import React, {Component} from 'react'
import {Typography, Row, Card, Col, Modal} from 'antd'

const {Title} = Typography;

class StillList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    openGallery = imgSrc => {
        this.setState({
            visible: true,
            currentImg: imgSrc
        });
    };

    render() {
        return (
            <div style={{marginBottom: '30px'}}>
                <Title style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>
                    {this.props.title}
                </Title>
                <div className="card-wrap">
                    <div className="scrollable-container">
                        <div>
                            <Row gutter={10}>
                                {this.props.data.map(item => (
                                    <Col span={6} key={'still' + item.id}>
                                        <Card hoverable style={{marginBottom: 10}} bodyStyle={{padding: '0 0'}}>
                                            <div>
                                                <img
                                                    style={{
                                                        display: "block",
                                                        width: "100%",
                                                        height: '9vw',
                                                    }}
                                                    alt="example"
                                                    src={item.photo}
                                                    onClick={() => this.openGallery(item.photo)}
                                                />
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                    <Modal style={{padding: '5% 9%'}}
                           width='100%'
                           height='100%'
                           bodyStyle={{padding: '0 0'}}
                           centered
                           visible={this.state.visible}
                           onCancel={() => {
                               this.setState({visible: false});
                           }}
                           footer={[]}
                    >
                        {<img src={this.state.currentImg} alt="" style={{width: "100%"}}/>}
                    </Modal>
                </div>
            </div>
        )
    }
}

export default StillList