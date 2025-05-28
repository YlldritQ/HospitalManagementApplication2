"use client";

import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Patient {
  patientId: number;
  fullName: string;
  gender: string;
  birthDate: string;
  phone: string;
}

export default function PatientPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [form] = Form.useForm();

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patient");
      setPatients(res.data);
    } catch (err) {
      console.error("Error fetching patients", err);
      message.error("Failed to load patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const onFinish = async (values: any) => {
    const payload = {
      ...values,
      birthDate: new Date(values.birthDate).toISOString(), // convert to valid ISO format
    };

    try {
      setLoading(true);

      if (editPatient) {
        await api.put(`/patient/${editPatient.patientId}`, payload);
        message.success("Patient updated");
      } else {
        await api.post("/patient", payload);
        message.success("Patient created");
      }

      setOpen(false);
      form.resetFields();
      setEditPatient(null);
      fetchPatients();
    } catch (err) {
      console.error("Error saving patient", err);
      message.error("Something went wrong while saving patient");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditPatient(patient);
    form.setFieldsValue({
      ...patient,
      birthDate: patient.birthDate.split("T")[0], // trim to yyyy-mm-dd
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/patient/${id}`);
      message.success("Patient deleted");
      fetchPatients();
    } catch (err) {
      console.error("Delete failed", err);
      message.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>

      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setEditPatient(null);
          form.resetFields();
          setOpen(true);
        }}
      >
        + Add Patient
      </Button>

      <Table
        dataSource={patients}
        rowKey="patientId"
        columns={[
          { title: "Full Name", dataIndex: "fullName" },
          { title: "Gender", dataIndex: "gender" },
          { title: "Birth Date", dataIndex: "birthDate" },
          { title: "Phone", dataIndex: "phone" },
          {
            title: "Actions",
            render: (_, record) => (
              <div style={{ display: "flex", gap: 8 }}>
                <Button icon={<FiEdit />} onClick={() => handleEdit(record)} />
                <Button
                  icon={<FiTrash2 />}
                  danger
                  onClick={() => handleDelete(record.patientId)}
                />
              </div>
            ),
          },
        ]}
      />

      <Modal
        open={open}
        title={editPatient ? "Edit Patient" : "Add Patient"}
        onCancel={() => {
          setOpen(false);
          setEditPatient(null);
        }}
        onOk={() => form.submit()}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[{ required: true }]}
          >
            <Input placeholder="yyyy-mm-dd" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
