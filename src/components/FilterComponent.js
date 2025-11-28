import React, { Component } from "react";
import "./FilterComponent.scss";

export default class FilterComponent extends Component {
  state = {
    q: "",
    selectedTags: [],
    availableTags: this.props.availableTags ?? null,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {

    this.setState({
      availableTags: [
        {
          value: "Tag 1",
          name: "Tag 1",
        },
        {
          value: "Tag 2",
          name: "Tag 2",
        }
      ]
    })
  }

  handleTagToggle = (tag) => {
    let selectedTags = this.state.selectedTags;

    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags.push(tag);
    }

    this.setState({
      selectedTags: selectedTags
    }, () => {
      if(this.props.onSubmit) this.props.onSubmit(selectedTags);
    })

  };

  render() {
    const { q, selectedTags, availableTags } = this.state;

    return (
      <form className="filter-form" onSubmit={this.handleSubmit}>
        <div className="hidden">
          <input
            type="text"
            name="q"
            value={q}
            onChange={this.handleInputChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="body" onSelect={(e) => e.preventDefault()}>
          <div className="active-filters">
            <h6 className="filter-title">Active filters</h6>
            <ul>
              {selectedTags?.map((tag) => (
                <li key={tag.value}>{tag.name}</li>
              ))}
            </ul>
          </div>

          <h6 className="filter-title">Filter</h6>

          <div className="tags-filter">
            {availableTags?.map((tag) => (
              <div className="form-group">
                <input
                  type="checkbox"
                  name={tag.value}
                  id={tag.value}
                  checked={selectedTags.includes(tag)}
                  onChange={() => this.handleTagToggle(tag)}
                />
                <label key={tag.value} for={tag.value}>
                  {tag.name}
                </label>
              </div>

            ))}
          </div>
        </div>
      </form>
    );
  }
}

