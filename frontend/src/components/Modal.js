import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// activeItem represents the Todo item to be edited.
// toggle is a function used to control the Modal’s state i.e open or close the modal.
// onSave is a function that is called to save the edited values of the Todo item.


export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">任务描述</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">开始日期</Label>
              <Input
                type="date"
                name="startDate"
                value={this.state.activeItem.startDate}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">结束日期</Label>
              <Input
                type="date"
                name="endDate"
                value={this.state.activeItem.endDate}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="projectManager">项目经理</Label>
              <Input
                type="text"
                name="projectManager"
                value={this.state.activeItem.projectManager}
                onChange={this.handleChange}
                placeholder="项目经理"
              />
            </FormGroup>                        
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}