import React, {useState} from 'react'
import {Typography, Row, Card, Col, Modal} from 'antd'

const {Title} = Typography;

const StillList = ({title, data}) => {

    const [visible, setVisible] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);


    const openGallery = imgSrc => {
        setVisible(true);
        setCurrentImg(imgSrc);
    };

    return (
        <div style={{marginBottom: '30px'}}>
            <Title level={4}>
                {title}
            </Title>
            <div className="card-wrap">
                <div className="scrollable-container">
                    <div>
                        <Row gutter={10}>
                            {data.map(item => (
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
                                                onClick={() => openGallery(item.photo)}
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
                       visible={visible}
                       onCancel={() => {
                           setVisible(false);
                       }}
                       footer={[]}
                >
                    {<img src={currentImg} alt="" style={{width: "100%"}}/>}
                </Modal>
            </div>
        </div>
    )
};

export default StillList