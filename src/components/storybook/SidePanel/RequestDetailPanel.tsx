import React, { useState, useCallback } from 'react';
import './RequestDetailPanel.scss';
import Button from '../Button/Button';
import { Icons } from '../icons/EmojiIcons';
import FormField from '../FormField/FormField';

// Types
interface RequestTag {
  id: string;
  label: string;
  icon: string;
  category: 'type' | 'service' | 'location' | 'people' | 'delivery';
}

interface Task {
  id: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface RequestDetail {
  id: string;
  title: string;
  dateTime: string;
  tags: RequestTag[];
  originator: {
    role: string;
    name: string;
    profilePicture?: string;
  };
  contactDetails: {
    familyName: string;
    address: string;
    phone: string;
  };
  description: string;
  tasks: Task[];
}

interface RequestDetailPanelProps {
  request: RequestDetail;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedRequest: RequestDetail) => void;
  onValidate: (requestId: string) => void;
}

const RequestDetailPanel: React.FC<RequestDetailPanelProps> = ({
  request,
  isOpen,
  onClose,
  onSave,
  onValidate,
}) => {
  const [editingRequest, setEditingRequest] = useState<RequestDetail>(request);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTags, setEditingTags] = useState<RequestTag[]>(request.tags);

  // Available tag options
  const availableTags: RequestTag[] = [
    { id: '1', label: 'מזון', icon: '🍽️', category: 'type' },
    { id: '2', label: 'מנות חמות', icon: '🔥', category: 'service' },
    { id: '3', label: 'מחוז מרכז', icon: '📍', category: 'location' },
    { id: '4', label: '3 אנשים', icon: '👥', category: 'people' },
    { id: '5', label: 'שינוע', icon: '🚚', category: 'delivery' },
    { id: '6', label: 'ביגוד', icon: '👕', category: 'type' },
    { id: '7', label: 'תרופות', icon: '💊', category: 'type' },
    { id: '8', label: 'מחוז צפון', icon: '📍', category: 'location' },
    { id: '9', label: 'מחוז דרום', icon: '📍', category: 'location' },
    { id: '10', label: '1-2 אנשים', icon: '👤', category: 'people' },
    { id: '11', label: '4+ אנשים', icon: '👥', category: 'people' },
  ];

  // Status options for tasks
  const statusOptions = [
    { value: 'pending', label: 'ממתין', color: 'yellow' },
    { value: 'in-progress', label: 'בטיפול', color: 'orange' },
    { value: 'completed', label: 'הושלם', color: 'green' },
  ];

  // Handle field changes
  const handleFieldChange = useCallback((field: keyof RequestDetail, value: any) => {
    setEditingRequest(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Handle tag selection
  const handleTagToggle = useCallback((tag: RequestTag) => {
    setEditingTags(prev => {
      const exists = prev.find(t => t.id === tag.id);
      if (exists) {
        return prev.filter(t => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  // Handle task status change
  const handleTaskStatusChange = useCallback((taskId: string, status: string) => {
    setEditingRequest(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, status: status as Task['status'] } : task
      ),
    }));
  }, []);

  // Handle task description change
  const handleTaskDescriptionChange = useCallback((taskId: string, description: string) => {
    setEditingRequest(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, description } : task
      ),
    }));
  }, []);

  // Add new task
  const handleAddTask = useCallback(() => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      description: 'משימה חדשה',
      status: 'pending',
    };
    setEditingRequest(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  }, []);

  // Remove task
  const handleRemoveTask = useCallback((taskId: string) => {
    setEditingRequest(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId),
    }));
  }, []);

  // Save changes
  const handleSave = useCallback(() => {
    const updatedRequest = {
      ...editingRequest,
      tags: editingTags,
    };
    onSave(updatedRequest);
    setIsEditing(false);
  }, [editingRequest, editingTags, onSave]);

  // Cancel editing
  const handleCancel = useCallback(() => {
    setEditingRequest(request);
    setEditingTags(request.tags);
    setIsEditing(false);
  }, [request]);

  // Validate request
  const handleValidate = useCallback(() => {
    onValidate(request.id);
  }, [request.id, onValidate]);

  if (!isOpen) return null;

  const currentRequest = isEditing ? editingRequest : request;
  const currentTags = isEditing ? editingTags : request.tags;

  return (
    <div className="request-detail-panel">
      <div className="request-detail-panel__header">
        <div className="request-detail-panel__header-left">
          <span className="request-detail-panel__datetime">{currentRequest.dateTime}</span>
        </div>
        <div className="request-detail-panel__header-right">
          <h2 className="request-detail-panel__title">
            {currentRequest.title}
          </h2>
          <div className="request-detail-panel__header-actions">
            <span className="request-detail-panel__icon">❤️</span>
            <span className="request-detail-panel__icon">📌</span>
          </div>
        </div>
        <Button
          type="icon-only"
          size="small"
          onClick={onClose}
          icon={Icons.close}
          id="close"
        />
      </div>

      <div className="request-detail-panel__content">
        {/* General Details Section */}
        <div className="request-detail-panel__section">
          <h3 className="request-detail-panel__section-title">פרטים כלליים</h3>
          <div className="request-detail-panel__tags">
            {isEditing ? (
              <div className="request-detail-panel__tags-editor">
                <div className="request-detail-panel__available-tags">
                  {availableTags.map(tag => (
                    <button
                      key={tag.id}
                      className={`tag-option ${currentTags.find(t => t.id === tag.id) ? 'selected' : ''}`}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag.icon} {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="request-detail-panel__tags-display">
                {currentTags.map(tag => (
                  <span key={tag.id} className="tag-display">
                    {tag.icon} {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Request Originator Section */}
        <div className="request-detail-panel__section">
          <h3 className="request-detail-panel__section-title">מעלה הבקשה</h3>
          {isEditing ? (
            <FormField
              type="text"
              value={currentRequest.originator.role}
              onChange={(value) => handleFieldChange('originator', { ...currentRequest.originator, role: value })}
              placeholder="תפקיד"
              id="role"
            />
          ) : (
            <div className="request-detail-panel__originator">
              <span className="request-detail-panel__originator-role">{currentRequest.originator.role}</span>
              {currentRequest.originator.profilePicture && (
                <img
                  src={currentRequest.originator.profilePicture}
                  alt="Profile"
                  className="request-detail-panel__profile-pic"
                />
              )}
            </div>
          )}
        </div>

        {/* Contact Details Section */}
        <div className="request-detail-panel__section">
          <h3 className="request-detail-panel__section-title">פרטי התקשרות</h3>
          <div className="request-detail-panel__contact-fields">
            <div className="request-detail-panel__contact-field">
              <span className="request-detail-panel__contact-icon">👤</span>
              {isEditing ? (
                <FormField
                  type="text"
                  value={currentRequest.contactDetails.familyName}
                  onChange={(value) => handleFieldChange('contactDetails', { ...currentRequest.contactDetails, familyName: value })}
                  placeholder="שם המשפחה"
                  id="familyName"
                />
              ) : (
                <span>{currentRequest.contactDetails.familyName}</span>
              )}
            </div>
            <div className="request-detail-panel__contact-field">
              <span className="request-detail-panel__contact-icon">📍</span>
              {isEditing ? (
                <FormField
                  type="text"
                  value={currentRequest.contactDetails.address}
                  onChange={(value) => handleFieldChange('contactDetails', { ...currentRequest.contactDetails, address: value })}
                  placeholder="כתובת"
                  id="address"
                />
              ) : (
                <span>{currentRequest.contactDetails.address}</span>
              )}
            </div>
            <div className="request-detail-panel__contact-field">
              <span className="request-detail-panel__contact-icon">📞</span>
              {isEditing ? (
                <FormField
                  type="tel"
                  value={currentRequest.contactDetails.phone}
                  onChange={(value) => handleFieldChange('contactDetails', { ...currentRequest.contactDetails, phone: value })}
                  placeholder="טלפון"
                  id="phone"
                />
              ) : (
                <span>{currentRequest.contactDetails.phone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="request-detail-panel__section">
          <h3 className="request-detail-panel__section-title">תיאור</h3>
          {isEditing ? (
            <FormField
              type="textarea"
              value={currentRequest.description}
              onChange={(value) => handleFieldChange('description', value)}
              placeholder="תיאור הבקשה"
              id="description"
            />
          ) : (
            <div className="request-detail-panel__description">
              {currentRequest.description}
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className="request-detail-panel__section">
          <h3 className="request-detail-panel__section-title">משימות</h3>
          <div className="request-detail-panel__tasks">
            {currentRequest.tasks.map(task => (
              <div key={task.id} className="request-detail-panel__task">
                <div className="request-detail-panel__task-content">
                  {isEditing ? (
                    <FormField
                      type="text"
                      value={task.description}
                      onChange={(value) => handleTaskDescriptionChange(task.id, String(value))}
                      placeholder="תיאור המשימה"
                      id="description"
                    />
                  ) : (
                    <span className="request-detail-panel__task-description">{task.description}</span>
                  )}
                </div>
                <div className="request-detail-panel__task-status">
                  {isEditing ? (
                    <FormField
                      type="select"
                      value={task.status}
                      onChange={(value) => handleTaskStatusChange(task.id, String(value))}
                      options={statusOptions.map(status => ({
                        value: status.value,
                        label: status.label,
                      }))}
                      id="status"
                    />
                  ) : (
                    <span className={`status-badge status-badge--${task.status}`}>
                      {statusOptions.find(s => s.value === task.status)?.label}
                    </span>
                  )}
                </div>
                {isEditing && (
                  <Button
                    type="icon-only"
                    size="small"
                    onClick={() => handleRemoveTask(task.id)}
                    icon={Icons.delete}
                    id="removeTask"
                  />
                )}
              </div>
            ))}
            {isEditing && (
              <Button
                type="secondary"
                size="small"
                onClick={handleAddTask}
                icon={Icons.add}
                btnText="הוסף משימה"
                id="addTask"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="request-detail-panel__actions">
          {isEditing ? (
            <>
              <Button
                type="primary"
                size="medium"
                onClick={handleSave}
                icon={Icons.check}
                btnText="שמור"
                id="save"
              />
              <Button
                type="secondary"
                size="medium"
                onClick={handleCancel}
                icon={Icons.close}
                btnText="ביטול"
                id="cancel"
              />
            </>
          ) : (
            <>
              <Button
                type="primary"
                size="medium"
                onClick={handleValidate}
                icon={Icons.check}
                btnText="העבר ואלידציה"
                id="validate"
              />
              <Button
                type="secondary"
                size="medium"
                onClick={() => setIsEditing(true)}
                icon={Icons.edit}
                btnText="ערוך"
                id="edit"
                />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPanel;
