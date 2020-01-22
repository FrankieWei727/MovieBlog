import React, {Component} from 'react'
import {Typography, Carousel} from 'antd'

const {Title} = Typography;

class StillList extends Component {
    render() {
        return (
            <div style={{marginBottom:'30px'}}>
                <Title style={{color: 'black', fontSize: '16px', fontWeight: 'bold'}}>
                    {this.props.title}
                </Title>
                <div style={{alignItems: 'centre'}}>
                    <Carousel autoplay>
                        {this.props.data.map(item => (
                            <div key={'stills' + item.id}>
                                <h3><img alt={item.movie} src={item.photo} style={{
                                    maxWidth: '90%',
                                    borderRadius: '5px',
                                    marginLeft: '20px',
                                    marginTop: '20px',
                                }}/></h3>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default StillList