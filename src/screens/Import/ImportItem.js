import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from 'react';
function ImportItem({ data }) {
    const [point, setPoint] = useState(0);
    useEffect(() => {
        const fetchApiGetPoint = async () => {
            const result = await ProductService.getPoint(data.id);
            setPoint(result.data);
            return result.data;
        };
        fetchApiGetPoint();
    }, []);

    return (
        <tr>
            <td>{data.id}</td>
            <td style={{ width: '10%', justifyContent: 'center' }}>
                <p className="avatar-lg ">
                    <img src={data.image} className="avatar-img rounded-circle" />
                </p>
            </td>
            <td>{data.name}</td>
            {/* <td>{data.inventoryNumber}</td> */}
        </tr>
    );
}

export default ImportItem;
