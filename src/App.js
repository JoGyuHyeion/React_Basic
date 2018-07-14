import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';
import PhonDetails from './components/PhonDetails';

class App extends Component {

  id = 3;

  state = {
    information: [
      {
        id: 0,
        name: '홍길동',
        phone: '010-0000-1111'
      },
      {
        id: 1,
        name: '김지숙',
        phone: '010-0000-2222'
      },
      {
        id: 2,
        name: '조리규',
        phone: '010-0000-3333'
      },
    ],
    keyword: '',
    selectedKey: -1,
  }

  handleClick = (key) => {
    this.setState({
      selectedKey: key
    })
    console.log(key, 'is selected')
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  handleCreate = (data) => {
    const { information } = this.state
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++
      })
    });
    console.log(data);
  }

  handleRemove = (id) => {
    const { information } = this.state
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handelUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(info => {
        if (info.id === id) {
          return {
            id,
            ...data,
          };
        }
        return info;
      })
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <input
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder='검색...'
        />
        <PhonDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.information[this.state.selectedKey]}
        />
        <PhoneInfoList
          data={this.state.information.filter(
            info => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handelUpdate}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;