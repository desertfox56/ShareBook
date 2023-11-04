//Доделать
import React from 'react';
import { Card, Col, Row,Typography, Image, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Meta } = Card;

function Cards(){
    return(
      <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}
        cover={
          <Image
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}>
          <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Card title"
      description="This is the description"
    />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
    );
}
export default Cards;