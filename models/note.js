class Note {
  constructor(id, userId, title, text, createdAt, modifiedAt) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }

  static fromRequest(body, userId) {
    const now = new Date();
    return new Note(
      undefined,
      userId,
      body.title,
      body.text,
      now,
      now
    );
  }

  toPublic() {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt
    };
  }
}
