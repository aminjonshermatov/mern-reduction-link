import React from 'react'
import { Link } from 'react-router-dom'

const LinkList = ({ links }) => {
    if (links.length === 0) {
        return <p className="center">Ссылок пока нет</p>;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Оригиналькая</th>
                        <th>Сокращенная</th>
                        <th>Открыть</th>
                    </tr>
                </thead>

                <tbody>
                    {links.map((link, ind) => {
                        return (
                            <tr key={link._id}>
                                <td>{ind + 1}</td>
                                <td>{link.from}</td>
                                <td>{link.to}</td>
                                <td>
                                    <Link to={`/detail/${link._id}`}>Открыть</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LinkList
