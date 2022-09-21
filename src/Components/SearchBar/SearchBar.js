import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {term: ''};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event){
    this.setState({term: event.target.value});
  }

  // I added the option to search pressing the enter key.
  handleKeyDown(e){
    if(e.key === 'Enter'){
      this.props.onSearch(this.state.term);
    }
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" 
        onChange ={this.handleTermChange}
        onKeyDown={this.handleKeyDown}/>
        <button className="SearchButton" 
        onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}