import React, {useState, useEffect} from 'react';
import { db } from '../../firebase';
import "./jumbotron.scss";
import ModalVideo from 'react-modal-video';
import { connect } from 'react-redux';
import { hideAnimation } from '../../redux/actions';

const Jumbotron = ({ hideAnimation }) => {
    const [anime, setAnime] = useState([]);
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {

        db.collection('anime').doc('oA4ytS11nTZdBwWdGYrj').onSnapshot(snapshot => {
            setAnime(snapshot.data().banner[Math.floor(Math.random() * snapshot.data().banner.length)])
        })
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
        
            <div className="jumbotron" style={{
                backgroundImage:`linear-gradient(77deg,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 85%),url("${anime?.photo}")`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}>
                <div className="jumbotron__contents">
                    <h1 className="jumbotron__title">
                        {anime?.name}
                    </h1>
                    <p className="jumbotron__desc">
                        {
                            truncate(anime?.summary, 150)
                        }
                    </p>
                    <div className="jumbotron__btns">
                        <button className="jumbotron__btn" onClick={() => {setOpen(true)
                        hideAnimation()}}>
                        <svg viewBox="0 0 24 24"><path d="M6 4l15 8-15 8z" fill="currentColor"></path></svg>Play</button>
                        <button className="jumbotron__btn secondary__btn">
                        <svg viewBox="0 0 24 24"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z" fill="currentColor"></path></svg>More Info</button>
                    </div>
                </div>
                {
                    anime.youtube && <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={anime?.youtube} onClose={() => setOpen(false)} />
                }

            </div> 
        
    )
}

const mapDispatchToProps = dispatch => ({
    hideAnimation: () => dispatch(hideAnimation())
})

export default connect(null, mapDispatchToProps)(Jumbotron)
