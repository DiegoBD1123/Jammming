import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import { Player  } from '../Player/Player';
import Spotify from '../../util/Spotify';

class App extends React.Component{

  constructor (props) {
    super(props);
    this.state = {
      searchResults:[],
      playlistName: 'My playlist',
      playlistTracks:[],
      currentSong: '',
      playerActive: false
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.selectSong = this.selectSong.bind(this);
    this.closePLayer = this.closePLayer.bind(this);
  }

  removeTrack(track){
    let tracks= this.state.playlistTracks;
    track = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: track}) 
  }

  addTrack(track){
    let tracks= this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist (){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(()=> {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  selectSong(track){
    let trackId = track.id;
    let trackUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    if(!this.state.playerActive){
      this.setState({currentSong: trackUrl});
      this.setState({playerActive: true});
    } else if (this.state.currentSong !== trackUrl) {
      this.setState({currentSong: trackUrl});
    } else if(this.state.currentSong === trackUrl){
      this.setState({playerActive: false});
    }
  }

  closePLayer(){
    if(this.state.playerActive){
      this.setState({playerActive: false})
    }
  }

  render(){
    let player;
    if(this.state.playerActive){
      player = <Player currentSong ={this.state.currentSong}
      closePLayer={this.closePLayer}/>;
    } else { player = ''}

    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          {player}
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
            onAdd={this.addTrack}
            selectSong={this.selectSong}/>

            <Playlist playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
            selectSong={this.selectSong}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;