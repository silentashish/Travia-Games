import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LottieView from 'lottie-react-native';

import GeneralHeadline from '../../components/General/GeneralHeadline';
import HomeMiddle from '../../components/Home/HomeMiddle';
import HomeText from '../../components/Home/HomeText';
import {
  fetchTriviaQuestions,
  resetTriviaQuestions,
  resetUserChoices,
} from '../../actions';
import {MEDIUM} from '../../utils/constants';
import SharedButton from '../../components/Shared/SharedButton';
import {BACKGROUND_COLOR} from '../../utils/globalColors';

const homeContainerStyle = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'space-between',
  },
  homeTextContainer: {
    marginTop: 110,
  },
  scoreText: {
    fontSize: 30,
    color: '#000',
    alignSelf: 'center',
    marginTop: 90,
  },
});

class HomeContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      difficulty: MEDIUM,
      isBeginLoading: false,
    };
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.resetTriviaQuestions();
    actions.resetUserChoices();
  }

  showDifficultyDialog = () => this.setState({isVisible: true});

  hideDifficultyDialog = () => this.setState({isVisible: false});

  checkDifficultyOption = (option) => this.setState({difficulty: option});

  beginTrivia = async () => {
    const {actions, navigation} = this.props;
    this.setState({isBeginLoading: true});
    await actions.fetchTriviaQuestions(this.state.difficulty);
    navigation.navigate('Quiz');
    this.setState({isBeginLoading: false});
  };

  render() {
    const {isVisible, difficulty, isBeginLoading} = this.state;

    return (
      <View style={homeContainerStyle.viewContainer}>
        <GeneralHeadline text="IQmaster" />

        <View style={{width: '100%', height: 200}}>
          <LottieView
            source={require('../../assets/animations/start.json')}
            autoPlay
            loop
          />
        </View>

        <View>
          <HomeMiddle
            isVisible={isVisible}
            showDialog={this.showDifficultyDialog}
            hideDialog={this.hideDifficultyDialog}
            difficulty={difficulty}
            checkDifficultyOption={this.checkDifficultyOption}
          />
        </View>

        <View>
          <SharedButton
            text="Start"
            onPress={this.beginTrivia}
            loading={isBeginLoading}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {fetchTriviaQuestions, resetUserChoices, resetTriviaQuestions},
      dispatch,
    ),
  };
};

export default connect(null, mapDispatchToProps)(HomeContainer);
