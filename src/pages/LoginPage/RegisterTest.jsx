
import * as registerAnimation from "./../../assets/animation/registerAnimation.json";
import Lottie from 'react-lottie';
import registerTest from "./registerTest.css"
import {
    Alert,
    Button,
    ConfigProvider,
    Form,
    Input,
    Select,
    message,
  } from "antd";
  import React from "react";
  import { userService } from "../../services/service";
  import { useDispatch } from "react-redux";
  import { loginAction } from "../../redux/action/user";
  import { useNavigate } from "react-router-dom";
  import {
    FacebookFilled,
    LockOutlined,
    MailOutlined,
    TwitterCircleFilled,
    UserOutlined,
    UserAddOutlined,
    PhoneOutlined
  } from "@ant-design/icons";
  function RegisterTest() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { Option } = Select;
    const onFinish = (values) => {
      console.log("Success:", values);
      let newUser = {
        email: values?.email,
        passWord: values?.passWord,
        name: values?.name,
        phoneNumber: values?.prefix + values?.phone,
      };
      userService
        .register(newUser)
        .then((res) => {
          message.success("Successful Registration!");
          let inforUser = {
            email: values?.email,
            passWord: values?.passWord,
          };
          let onSuccess = () => {
            // message.success("Success");
            // window.location.href = "/";
            navigate("/login");
          };
          dispatch(loginAction(inforUser, onSuccess));
          form.resetFields();
        })
        .catch((err) => {
          console.log("🚀 ~ file: Register.jsx:22 ~ onFinish ~ err:", err);
          message.error("Register failed");
        });
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select
          style={{
            width: 170,
            height:40,
          }}
          defaultValue="86"
        >
          <Option value="78">+78</Option>
          <Option value="79">+79</Option>
          <Option value="90">+90</Option>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
          <Option value="97">+97</Option>
          <Option value="98">+98</Option>
        </Select>
      </Form.Item>
    );
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: registerAnimation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    return (
      <div>
       <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
  <div className=" css bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth: 1000}}>
    <div className="md:flex w-full">
      <div className=" animation-register hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
        <Lottie className="hello" options={defaultOptions} height={400} width={400} />
      </div>
      <div className="form-register w-full md:w-1/2 py-10 px-5 md:px-10">
      <div>
      <div className="register container">
        <div className="flex flex-col justify-center items-center ">
          <ConfigProvider
            theme={{
              //     token:{
              // margin:10
              //     },
              components: {
                Form: {
                  itemMarginBottom: 10,
                  verticalLabelPadding: 1,
                },
              },
            }}
          >
            <Form
              className=" flex flex-col align-center justify-center"
              form={form}
              name="register"
              style={
                {
                  // maxWidth: 800,
                  // maxHeight: 800,
                  // width:300
                }
              }
              initialValues={{
                name: "",
                passWord: "",
                email: "",
                phoneNumber: "",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="text-center font-bold text-3xl text-gray-900">
                REGISTER
              </div>
              <p className="text-center pb-3">Enter your information to register</p>

              {/* Name */}
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                style={{
                    height: "40px",
                }}
                  prefix={<UserAddOutlined  className="site-form-item-icon" />}
                  type="text"
                  placeholder="Your name"
                />
              </Form.Item>
                
              {/* Password */}
              <Form.Item
                // label="Password"
                name="passWord"
                rules={[{ required: true }]}
              >
                <Input
                  style={{
                    height: "40px",
                }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
              </Form.Item>
                
              {/* Confirm Password  */}
              <Form.Item
                // label="Confirm Password"
                name="password2"
                dependencies={["passWord"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("passWord") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input
                  style={{
                    height: "40px",
                }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm password"
                />
              </Form.Item>
                  {/* Email */}
              <Form.Item
                // label="Email :"
                name={"email"}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "The email address is illegal!",
                  },
                ]}
              >
                <Input
                  style={{
                    height: "40px",
                }}
                  prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                />
              </Form.Item>

                  {/* phone */}
              <Form.Item
                // name="phone"
                // label="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  className="phone"
                  style={{
                    height: "40px",
                }}
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  type="number"
                />
              </Form.Item>

              <Form.Item className="nut w-full flex justify-center items-center">
                <>
                    <Button htmlType="reset" danger 
                    style={{ width: "80px"}}
                    className="clear-button px-3 mx-3 lg:px-7">
                        Clear
                    </Button>

                  <Button
                    type="text"
                    htmlType="submit"
                    style={{ backgroundColor: "#1890ff" ,width: "80px"}}
                    className=" register-button px-3 mx-3 lg:px-7 btnBlue"
                  >
                    Register
                  </Button>
                  
                  {/* <Button
                    className="px-3 mx-2 lg:px-7"
                    type="text"
                    onClick={() => {
                      // window.location.href = "/login";
                      navigate("/login");
                    }}
                    style={{ backgroundColor: "#808080", color: "white" }}
                  >
                    Login
                  </Button> */}

                  <p className="text-center pt-3">Already have an account?{"\u00A0"} 
                    <a 
                    className="text-red-500 hover:text-red-900"
                    onClick={() => {
                      // window.location.href = "/login";
                      navigate("/login");
                    }}>
                     Sign in here 
                    </a>
                  </p>
                </>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
       
        
      </div>
    </div>
  </div>
</div>

      </div>
    );
  }
  export default RegisterTest;
  