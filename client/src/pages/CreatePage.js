import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from "react-router-dom";

const CreatePage = () => {
    const history = useHistory();

    const auth = useContext(AuthContext);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const [link, setLink] = useState('');

    const { request } = useHttp();

    const pressHandler = async ev => {
        if (ev.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);
            } catch (e) {}
        }
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
