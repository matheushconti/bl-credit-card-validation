import React, { useMemo } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { mask } from "react-native-mask-text";
import { Formik } from "formik";
import * as yup from "yup";

import { Input } from "@components";
import {
  isCardAccept,
  isCardValid,
  isCvvValid,
  isDateValid,
  isNameValid,
} from "@utils";

const validationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("This field is required.")
    .min(13, "Must be at least 13 digits")
    .max(16, "Must be at most 255 digits")
    .test("isValid", "Credit card number invalid", (value, _) =>
      isCardValid(value)
    )
    .test("isAccepted", "This card is not accepted", (value, _) =>
      isCardAccept(value)
    ),
  expirationDate: yup
    .string()
    .required("This field is required.")
    .min(5, "Please type a full date")
    .max(5, "Must be at most 5 digits")
    .test("isValid", "Expiration Date invalid", (value, _) =>
      isDateValid(value)
    ),
  cvv: yup
    .string()
    .typeError("This field must be a number")
    .required("This field is required.")
    .min(3, "Must be at least 3 digits")
    .max(4, "Must be at most 4 digits")
    .test("isValid", "CVV invalid", (value, context) => {
      const { cardNumber } = context.parent;
      return isCvvValid(value, cardNumber);
    }),
  firstName: yup
    .string()
    .required("This field is required.")
    .min(2, "Must be at least 2 characters")
    .max(255, "Must be at most 255 characters")
    .test("isValid", "First Name invalid", (value, _) => isNameValid(value)),
  lastName: yup
    .string()
    .required("This field is required.")
    .min(2, "Must be at least 2 characters")
    .max(255, "Must be at most 255 characters")
    .test("isValid", "Last Name invalid", (value, _) => isNameValid(value)),
});

type ICardForm = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  firstName: string;
  lastName: string;
};

const CardForm = () => {
  const initialValues: ICardForm = {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    firstName: "",
    lastName: "",
  };

  const handleFormSubmit = async (values: ICardForm) => {
    console.log("Credit Card Values", values);
    Alert.alert("Credit Card Valid");
  };

  return (
    <View>
      <Text style={styles.title}>Credit Card Screen</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
        }) => (
          <View>
            <Input
              label="Card Number"
              onChangeText={handleChange("cardNumber")}
              onBlur={handleBlur("cardNumber")}
              value={values.cardNumber}
              maxLength={16}
              placeholder="Card Number"
              keyboardType="numeric"
              error={touched.cardNumber ? errors.cardNumber : undefined}
            />
            <View style={styles.inputTwoColumnContainer}>
              <Input
                label="Expiration Date"
                onChangeText={(value) => {
                  const formattedValue = mask(value, "99/99");
                  setFieldValue("expirationDate", formattedValue);
                }}
                onBlur={handleBlur("expirationDate")}
                value={values.expirationDate}
                maxLength={5}
                placeholder="MM/YY"
                keyboardType="numeric"
                error={
                  touched.expirationDate ? errors.expirationDate : undefined
                }
              />
              <Input
                label="Security Code"
                onChangeText={handleChange("cvv")}
                onBlur={handleBlur("cvv")}
                value={values.cvv}
                placeholder="CVV"
                maxLength={4}
                keyboardType="numeric"
                error={touched.cvv ? errors.cvv : undefined}
              />
            </View>
            <View style={styles.inputTwoColumnContainer}>
              <Input
                label="First Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
                placeholder="John"
                error={touched.firstName ? errors.firstName : undefined}
                maxLength={255}
              />
              <Input
                label="Last Name"
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                value={values.lastName}
                placeholder="Doe"
                error={touched.lastName ? errors.lastName : undefined}
                maxLength={255}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CardForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  inputTwoColumnContainer: {
    flexDirection: "row",
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  title: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "gray",
    fontSize: 20,
    color: "white",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    padding: 20,
    margin: 15,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});
