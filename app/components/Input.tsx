import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface IInput {
  error?: string;
  label: string;
}

const Input = ({ error = "", label, ...props }: TextInputProps & IInput) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <TextInput style={styles.input} {...props} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    padding: 10,
    marginVertical: 3,
  },
  error: {
    fontSize: 12,
    color: "red",
  },
});

export default Input;
