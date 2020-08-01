import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import contentsDef from './contents';

class PortFolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus : [
        {
          title : "HISTORY",
          selected : false 
        },
        {
          title : "ABOUT",
          selected : false
        },
        {
          title : "SKILL",
          selected : false
        },
        {
          title : "LINKS",
          selected : false
        }
      ],
      contents : contentsDef,
      currentContents : null,
      currentContentsName : null,
      isMain : true
    }
  }
  render() {
    return (
      <div className="portfolio">
        <Navigation
        menus={this.state.menus}
        onClick={index => this.refleshSelected(index)}/>
        <Contents 
        isMain={this.state.isMain}
        currentContentsName={this.state.currentContentsName}
        currentContents={this.state.currentContents}
        />
      </div>
    )
  }
  refleshSelected(index) {
    const menus = this.state.menus.slice();
    menus.forEach(menu => menu.selected = false);
    menus[index].selected = true;
    const contentsName = menus[index].title.toLocaleLowerCase();
    this.setState({
      menus : menus,
      currentContents : contentsDef[contentsName],
      currentContentsName : menus[index].title,
      isMain : false
    });
  }
}

class Navigation extends React.Component {

  render() {
    return(
      <div className="navigation">
        <nav>
          <NavigationUL
            menus={this.props.menus}
            onClick={index => this.props.onClick(index)}
          />
        </nav>
      </div>);
  }
}

class NavigationUL extends React.Component {
  render() {
    const menus = this.props.menus;
    const list = [];
    Array.from(menus).forEach(
      (menu, index) => list.push(this.renderList(menu, index)));

    return(
      <ul className="nav-ul">
        {list}
      </ul>
    );
  }

  renderList(menu, index) {
    const title = menu.title;
    const selected = menu.selected;
    const className = selected ? "nav-li selected" : "nav-li";
    return(
      <li className={className} onClick={() => this.props.onClick(index)}>
        {title}
      </li>
    );
  }  
}

class Main extends React.Component {
  render() {
    return(
      <div className="main">
        <div className="name">
          turn-take
        </div>
        <div className="sub">
          PORTFOLIO
        </div>
      </div>
    )
  };
}

class Contents extends React.Component{
  render() {
    return (
      <div className="contents">
        {this.props.isMain ? <Main/> : <Content 
        currentContentsName={this.props.currentContentsName}
        currentContents={this.props.currentContents}/>}
      </div>
    )
  }
}

class Content extends React.Component{
  render() {
    return (
      <div>
        <h2>
          {this.props.currentContentsName}
        </h2>
        <dl className="defList">
          {this.rendarList()}
        </dl>
      </div>
    )
  }

  rendarList() {
    const list = [];
    Array.from(this.props.currentContents).forEach(obj => {
      Object.keys(obj).forEach(key => {
        switch (key) {
          case "dt":
            list.push(<dt>{obj[key]}</dt>);
            break;
          case "dd":
            if(obj.isLink) {
              list.push(
                <dd>
                  <a href={obj.src} target="blank">{obj[key]}</a>
                </dd>
              )
            } else {
              list.push(<dd>{obj[key]}</dd>);
            }
            break;
          default:
            break;
        }
      })
    })
    return list;
  }
}

ReactDOM.render(
  <PortFolio/>,
  document.getElementById('root')
);

