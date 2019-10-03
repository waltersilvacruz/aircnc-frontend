import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard() {
    const [ spots, setSpots ] = useState([]);
    const [ deleted, setDeleted ] = useState(0);
    
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }

        loadSpots();
    }, [deleted]);

    async function handleRemove(item) {
        await api.delete(`/spots/${item._id}`);
        setDeleted(deleted + 1);
    }
    
    return (
        <>
            <ul className="spot-list">
                {spots.map((spot) => (
                    <li key={spot._id}>
                        <header style={{ 
                            backgroundImage: `url(${spot.thumbnail_url})`
                        }}>
                            <span href="#" onClick={event => { handleRemove(spot); }}>X</span>
                        </header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$ ${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );
}