import React from "react";
import {FaEdit, FaTrash} from "react-icons/fa";

const List =({items, removeItem, editItem}) => {
    return (
        <div className="container">{
            items.map((item) => {
                const {id, title} = item;
                return(
                    <ul className="list-group list-group-flush" key={id}>
                        <li className="list-group-items d-flex justify-content-between align-items-center">
                            {title}
                            <div style={{float: "right"}}>
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => editItem(id)}>
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => removeItem(id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    </ul>
                )})}
        </div>
    )
}

export default List