import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonRounded from '../../components/ButtonRounded';
import MovieItem from '../../components/MovieItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {MoviesStackParamList} from '../../routing/MoviesNavigator';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MovieDescription} from '../../types/movie/movie.description';
import useMoviesApi from '../../api/movies/useMoviesApi';
import useRequest from '../../api/useRequest';
import {CastDto} from '../../api/movies/dto/cast.dto';
import MovieItemSceleton from '../../components/MovieItemSceleton';

type MoviesListScreenNavigationProp = StackNavigationProp<
  MoviesStackParamList,
  'MovieDescription'
>;
type MoviesListScreenRuteProp = RouteProp<
  MoviesStackParamList,
  'MovieDescription'
>;

const MovieDescriptionScreen = () => {
  const navigation = useNavigation<MoviesListScreenNavigationProp>();
  const {params} = useRoute<MoviesListScreenRuteProp>();
  const [movie, setMovie] = useState<MovieDescription | {}>({});
  const [cast, setCast] = useState<CastDto>([]);
  const moviesApi = useMoviesApi();
  const {sendRequest: sendRequestDescription, loading: loadingDescription} =
    useRequest();
  const {sendRequest: sendRequestCast, loading: loadingCast} = useRequest();

  useEffect(() => {
    sendRequestDescription(moviesApi.description(params.movieId)).then(res => {
      if (res) {
        setMovie(res.data);
      }
    });
    sendRequestCast(moviesApi.cast(params.movieId)).then(res => {
      if (res) {
        setCast(res.data);
      }
    });
  }, []);
  const onNavigateComments = () => {
    navigation.navigate('MovieComments', {movieId: params.movieId});
  };

  return (
    <View>
      {loadingDescription || loadingCast ? (
        <MovieItemSceleton />
      ) : (
        <>
          <MovieItem movieDescription={movie} disabled />
          <View style={styles.containerCastComments}>
            <View style={styles.castContainer}>
              <Text style={styles.castTitle}>Cast:</Text>
              <Text style={styles.castDescription}>{cast.join(', ')}</Text>
            </View>
            <ButtonRounded title="Show comments" onPress={onNavigateComments} />
          </View>
        </>
      )}
    </View>
  );
};

export default MovieDescriptionScreen;

const styles = StyleSheet.create({
  castContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  castTitle: {
    color: '#b9b9b9',
    fontSize: 16,
  },
  castDescription: {
    color: 'black',
    fontSize: 16,
  },
  containerCastComments: {
    width: '80%',
    marginLeft: 10,
  },
});
