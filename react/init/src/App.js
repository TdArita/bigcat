import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, DatePicker, message, Button } from 'antd'

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`您选择的日期是: ${date ? date.format('YYYY-MM-DD') : '未选择'}`);
    this.setState({ date });
  };
  render() {
    const { date } = this.state;
    return (
      <div>
        <ConfigProvider locale={zhCN}>
          <div style={{ width: 400, margin: '100px auto' }}>
            <DatePicker onChange={this.handleChange} />
            <div style={{ marginTop: 20 }}>
              当前日期：{date ? date.format('YYYY-MM-DD') : '未选择'}
            </div>
          </div>
        </ConfigProvider>
        <Button type="primary">Primary</Button>
      </div>

    );
  }
}

export default App;
