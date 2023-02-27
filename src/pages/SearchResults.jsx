import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Stack,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Divider,
  Box,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ExpandLess, ExpandMore, Comment } from '@mui/icons-material';
import catchError from '../utils/catchError';
import { useMemo } from 'react';
import ServerService from '../api';
import CourseCardFull from '../helpers/CourseCardFull';
import CourseCard from '../helpers/CourseCard';
import CourseCardFullHorizontal from '../helpers/CourseCardHorizontal';
import { makeStyles } from '@mui/styles';

const sortItems = [
  { label: 'Most Relevant', value: 'most relevant' },
  { label: 'Most Reviewed', value: 'most reviewed' },
  { label: 'Highest Rated', value: 'highest rated' },
  { label: 'Newest', value: 'newest' },
];

const levelItems = [
  { label: 'All Levels', value: 'all levels' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Expert', value: 'expert' },
];
const useStyles = makeStyles((theme) => ({
  leftContent: {
    width: '300px',
    height: 'fit-content',
    [theme.breakpoints.down('md')]: { display: 'none' },
  },
}));
function SearchResults(props) {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState([]);
  const [openTopic, setTopicOpen] = useState(true);
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([0]);
  const [courses, setCourses] = useState([]);

  const queryObject = useMemo(
    () =>
      props.location.search
        ?.replace('?', '')
        .split('&')
        .reduce((a, v) => {
          const [key, value] = v.split('=');
          return { ...a, [key]: value };
        }, {}),
    [props]
  );

  useEffect(() => {
    ServerService.getCategories()
      .then((response) => setCategoryList(response.data))
      .catch((error) => catchError(error, dispatch));
    ServerService.getCourses(queryObject.query)
      .then((response) => setCourses(response.data))
      .catch((error) => catchError(error, dispatch));
  }, []);

  const handleClick = () => setTopicOpen(!openTopic);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Container sx={{ pt: 4 }}>
      {/* NUMBER OF RESULT */}
      <Typography gutterBottom variant='h2'>
        10,000 results for “{queryObject?.query}”
      </Typography>
      {/* TITLE OF COURSE */}
      <Typography variant='h6'>
        Explore{' '}
        <Typography color='primary' component='span' variant='h6'>
          JavaScript courses
        </Typography>
      </Typography>
      {/* RELATED COURSE */}
      <Typography variant='h6'>
        Students also learn{' '}
        <Typography color='primary' component='span' variant='h6'>
          Web Development Node.Js CSS React MongoDB HTML
        </Typography>
      </Typography>
      <Box sx={{ display: 'flex', mt: 4 }}>
        {/* FILTER */}
        <Stack
          className={classes.leftContent}
          spacing={2}
          my={2}
          direction='column'
        >
          <TextField
            size='small'
            id='outlined-select-currency'
            style={{ width: '190px' }}
            select
            label='Sort by'
            color='secondary'
          >
            {sortItems.map((option) => (
              <MenuItem key={option.label + 1} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Divider />

          <ListItemButton onClick={handleClick}>
            {/* <ListItemIcon>
            <Inbox />
          </ListItemIcon> */}
            <ListItemText primary='Topic' />
            {openTopic ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTopic} timeout='auto' unmountOnExit>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {categoryList.map((item) => {
                const labelId = `checkbox-list-label-${item.categoryName}`;

                return (
                  <ListItem
                    key={labelId}
                    secondaryAction={<Typography>(299)</Typography>}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox
                          edge='start'
                          //   checked={checked.indexOf(value) !== -1}
                          //   tabIndex={-1}
                          disableRipple
                          // inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <Typography variant='body2'>
                        {item.categoryName}
                      </Typography>{' '}
                    </ListItemButton>
                    {/* <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                  </ListItemButton> */}
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          <Divider />

          <ListItemButton onClick={handleClick}>
            <ListItemText primary='Level' />
            {openTopic ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTopic} timeout='auto' unmountOnExit>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {levelItems.map((item) => {
                const labelId = `checkbox-list-label-${item.label}`;

                return (
                  <ListItem
                    key={item.label}
                    secondaryAction={<Typography>(299)</Typography>}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <Checkbox
                          edge='start'
                          //   checked={checked.indexOf(value) !== -1}
                          //   tabIndex={-1}
                          disableRipple
                          // inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <Typography>{item.label}</Typography>{' '}
                    </ListItemButton>
                    {/* <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                  </ListItemButton> */}
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          <Divider />
        </Stack>
        {/* - Courses */}
        <Container sx={{ mt: 1 }}>
          <Grid container spacing={4}>
            {courses?.map((course, idx) => (
              <>
                <Grid item xs={12}>
                  <CourseCardFullHorizontal key={idx} val={course} />
                </Grid>
                <Grid item xs={12}>
                  <CourseCardFullHorizontal key={idx} val={course} />
                </Grid>
                {/* <CourseCardFull key={idx} val={course} />
                <CourseCardFull key={idx} val={course} />
                <CourseCardFull key={idx} val={course} />
                <CourseCardFull key={idx} val={course} />
                <CourseCardFull key={idx} val={course} />
                <CourseCardFull key={idx} val={course} />
                <CourseCardFull key={idx} val={course} /> */}
              </>
            ))}
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}

export default SearchResults;
