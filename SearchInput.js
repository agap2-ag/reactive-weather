import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class SearchInput extends Component {
  state = {
    text: "",
  };

  triggerChange = (text) => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { text } = this.state;

    if (!text) return;
    this.props.onEdit(text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <TextInput
        autoCorrect={false}
        placeholder={this.props.placeholder}
        placeholderTextColor="white"
        clearButtonMode="always"
        style={styles.textInput}
        value={this.state.text}
        onChangeText={this.triggerChange}
        onSubmitEditing={this.handleSubmitEditing}
      />
    );
  }
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
};
SearchInput.defaultProps = {
  placeholder: "type to search for a location",
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});
