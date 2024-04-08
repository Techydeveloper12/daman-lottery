import React from 'react';
import { Box, List, ListItem, Typography, Avatar } from '@mui/material';

const Timer = () => {
    const menuItems = [
        { text: 'Lottery', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141426883l.png' },
        { text: 'Popular', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141435wkxx.png' },
        { text: 'Slots', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141445b3ka.png' },
        { text: 'Fishing', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141457h3ts.png' },
        { text: 'PVC', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141515owja.png' },
        { text: 'Casino', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_202403111415086ujt.png' },
        { text: 'Sports', icon: 'https://ossimg.91admin123admin.com/91club/gamecategory/gamecategory_20240311141522uvco.png' },
      
    ];

    const contentTabs = [
        { title: 'Win Go', icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_202307140102511fow.png'], description: 'Green/Red/Purple', description2: 'Guess Number' },
        { title: 'K3', icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_20230714010227swu2.png'], description: 'Big/Small/Odd/Even', description2: 'Guess Number' },
        { title: '5D', icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_2023071401023322dy.png'], description: 'Big/Small/Odd/Even', description2: 'Guess Number' },
        { title: 'Trx Win', icons: ['https://ossimg.91admin123admin.com/91club/lotterycategory/lotterycategory_20230714010246lyuc.png'], description: 'Green/Red/Purple', description2: 'Guess Number' },
    ];

    return (
        <Box display="flex" mx={1}>
            <Box mr={2}>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} button >
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar src={item.icon} alt={item.text} />
                                <Typography variant="body2">{item.text}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box flexGrow={1}>
    {contentTabs.map((tab, index) => (
        <Box key={index} mb={2} p={2} bgcolor="background: -webkit-linear-gradient(324.57deg, #ff8e89 12.38%, #ffc3a2 87.13%);
      background-image: -webkit-linear-gradient(324.57deg, rgb(255, 142, 137) 12.38%, rgb(255, 195, 162) 87.13%);
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: initial;" borderRadius={4} width="90%">
            <Box display="flex" justifyContent="space-between" alignItems="stretch" mb={1}>
                <Box flexGrow={1}>
                    <Typography variant="h6" style={{ color:"white",fontWeight:"bold" }}>{tab.title}</Typography>
                    <Typography style={{ color:"white",fontWeight:"bold" }}>{tab.description2}</Typography>
                    <Typography style={{ color:"white",fontWeight:"bold" }}>{tab.description}</Typography>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="center">
                    {tab.icons.map((icon, iconIndex) => (
                        <Avatar key={iconIndex} src={icon} alt={`Icon ${iconIndex}`}  style={{ height: '80px', width: '80px' }} />
                    ))}
                </Box>
            </Box>
        </Box>
    ))}
</Box>
        </Box>
    );
};

export default Timer;