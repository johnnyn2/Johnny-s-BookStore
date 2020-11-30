import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import {EnhancedTable} from '../components/EnhancedTable';

export const Payment = () => {
    return (
        <Card style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 40 }}>
            
            <div style={{margin: 40}}>
                <Typography  variant="h5" id="tableTitle" component="h1">
                    Payment Details
                </Typography>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <EnhancedTable/>
                </div>
            </div>
        </Card>
    );
}

