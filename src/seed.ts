import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from './app.module';
import { User } from './modules/auth/schemas/user.schema';
import { Person } from './modules/auth/schemas/person.schema';
import { Client } from './modules/clients/schemas/client.schema';
import { Area } from './modules/clients/schemas/area.schema';
import { Brand } from './modules/inventory/schemas/brand.schema';
import { Model as InventoryModel } from './modules/inventory/schemas/model.schema';
import { ProductType } from './modules/inventory/schemas/product-type.schema';
import { Attribute } from './modules/inventory/schemas/attribute.schema';
import { AttributeOption } from './modules/inventory/schemas/attribute-option.schema';
import { ProductTypeAttribute } from './modules/inventory/schemas/product-type-attribute.schema';
import { Product } from './modules/inventory/schemas/product.schema';
import { ProductAttributeValue } from './modules/inventory/schemas/product-attribute-value.schema';
import { Part } from './modules/inventory/schemas/part.schema';
import { ProductPart } from './modules/inventory/schemas/product-part.schema';
import { TicketProblemType } from './modules/tickets/schemas/ticket-problem-type.schema';
import { Ticket } from './modules/tickets/schemas/ticket.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel = app.get(getModelToken(User.name));
  const personModel = app.get(getModelToken(Person.name));
  const clientModel = app.get(getModelToken(Client.name));
  const areaModel = app.get(getModelToken(Area.name));
  const brandModel = app.get(getModelToken(Brand.name));
  const modelModel = app.get(getModelToken(InventoryModel.name));
  const productTypeModel = app.get(getModelToken(ProductType.name));
  const attributeModel = app.get(getModelToken(Attribute.name));
  const optionModel = app.get(getModelToken(AttributeOption.name));
  const productTypeAttributeModel = app.get(getModelToken(ProductTypeAttribute.name));
  const productModel = app.get(getModelToken(Product.name));
  const productAttributeValueModel = app.get(getModelToken(ProductAttributeValue.name));
  const partModel = app.get(getModelToken(Part.name));
  const productPartModel = app.get(getModelToken(ProductPart.name));
  const problemTypeModel = app.get(getModelToken(TicketProblemType.name));
  const ticketModel = app.get(getModelToken(Ticket.name));

  await Promise.all([
    userModel.deleteMany({}),
    personModel.deleteMany({}),
    clientModel.deleteMany({}),
    areaModel.deleteMany({}),
    brandModel.deleteMany({}),
    modelModel.deleteMany({}),
    productTypeModel.deleteMany({}),
    attributeModel.deleteMany({}),
    optionModel.deleteMany({}),
    productTypeAttributeModel.deleteMany({}),
    productModel.deleteMany({}),
    productAttributeValueModel.deleteMany({}),
    partModel.deleteMany({}),
    productPartModel.deleteMany({}),
    problemTypeModel.deleteMany({}),
    ticketModel.deleteMany({}),
  ]);

  const seedUsers = [
    {
      email: process.env.SEED_SUPER_EMAIL || 'super@ims.local',
      password: process.env.SEED_SUPER_PASSWORD || 'ChangeMe123!',
      role: 'super-user',
    },
    {
      email: process.env.SEED_ADMIN_EMAIL || 'admin@ims.local',
      password: process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!',
      role: 'admin',
    },
    {
      email: process.env.SEED_TECH_EMAIL || 'tech@ims.local',
      password: process.env.SEED_TECH_PASSWORD || 'ChangeMe123!',
      role: 'technician',
    },
    {
      email: process.env.SEED_USER_EMAIL || 'user@ims.local',
      password: process.env.SEED_USER_PASSWORD || 'ChangeMe123!',
      role: 'user',
    },
  ];

  const users = [] as any[];
  for (const userData of seedUsers) {
    const user = await userModel.create(userData);
    users.push(user);
  }
  await personModel.insertMany(users.map((user: any) => ({ userId: user._id })));

  const clients = await clientModel.insertMany([
    { name: 'Acme Corp', code: 'ACME', status: 'active' },
    { name: 'Globex', code: 'GLOBEX', status: 'active' },
    { name: 'Initech', code: 'INTECH', status: 'inactive' },
  ]);

  const areas = await areaModel.insertMany([
    { clientId: clients[0]._id, name: 'Contabilidad', code: 'ACC', notes: 'Área contable' },
    { clientId: clients[0]._id, name: 'IT', code: 'IT', notes: 'Área de TI' },
    { clientId: clients[1]._id, name: 'Ventas', code: 'SALES', notes: 'Equipo comercial' },
    { clientId: clients[1]._id, name: 'Soporte', code: 'SUP', notes: 'Soporte interno' },
    { clientId: clients[2]._id, name: 'Operaciones', code: 'OPS', notes: 'Operaciones' },
    { clientId: clients[2]._id, name: 'Admin', code: 'ADM', notes: 'Administración' },
  ]);

  const brands = await brandModel.insertMany([
    { name: 'HP', code: 'HP' },
    { name: 'Dell', code: 'DELL' },
    { name: 'Lenovo', code: 'LENOVO' },
  ]);

  const models = await modelModel.insertMany([
    { brandId: brands[0]._id, name: 'LaserJet 1020', code: 'LJ1020' },
    { brandId: brands[0]._id, name: 'ProBook 450', code: 'PB450' },
    { brandId: brands[1]._id, name: 'Latitude 7420', code: 'LAT7420' },
    { brandId: brands[1]._id, name: 'OptiPlex 7010', code: 'OPT7010' },
    { brandId: brands[2]._id, name: 'ThinkPad X1', code: 'TPX1' },
    { brandId: brands[2]._id, name: 'IdeaCentre AIO', code: 'AIO' },
  ]);

  const productTypes = await productTypeModel.insertMany([
    { name: 'Laptop', code: 'LAPTOP' },
    { name: 'Impresora', code: 'PRINTER' },
    { name: 'Desktop', code: 'DESKTOP' },
  ]);

  const attributes = await attributeModel.insertMany([
    { name: 'RAM', code: 'RAM', valueType: 'number' },
    { name: 'CPU', code: 'CPU', valueType: 'string' },
    { name: 'Tiene WiFi', code: 'WIFI', valueType: 'boolean' },
    { name: 'Fecha de compra', code: 'PURCHASE_DATE', valueType: 'date' },
    { name: 'Color', code: 'COLOR', valueType: 'enum' },
  ]);

  const colorAttribute = attributes.find((attr: any) => attr.code === 'COLOR');
  const attributeOptions = await optionModel.insertMany([
    { attributeId: colorAttribute._id, label: 'Negro', value: 'black' },
    { attributeId: colorAttribute._id, label: 'Gris', value: 'gray' },
    { attributeId: colorAttribute._id, label: 'Blanco', value: 'white' },
  ]);

  await productTypeAttributeModel.insertMany([
    { productTypeId: productTypes[0]._id, attributeId: attributes[0]._id, required: true },
    { productTypeId: productTypes[0]._id, attributeId: attributes[1]._id, required: true },
    { productTypeId: productTypes[0]._id, attributeId: attributes[2]._id, required: false },
    { productTypeId: productTypes[1]._id, attributeId: attributes[3]._id, required: true },
    { productTypeId: productTypes[1]._id, attributeId: attributes[4]._id, required: false },
    { productTypeId: productTypes[2]._id, attributeId: attributes[0]._id, required: true },
    { productTypeId: productTypes[2]._id, attributeId: attributes[4]._id, required: false },
  ]);

  const products = await productModel.insertMany([
    {
      inventoryCode: 'INV-001',
      serialNumber: 'SN-001',
      productTypeId: productTypes[0]._id,
      modelId: models[1]._id,
      purchaseDate: new Date('2024-01-10'),
      status: 'active',
      assignedTo: areas[0]._id,
    },
    {
      inventoryCode: 'INV-002',
      serialNumber: 'SN-002',
      productTypeId: productTypes[0]._id,
      modelId: models[2]._id,
      purchaseDate: new Date('2024-03-20'),
      status: 'in_repair',
      assignedTo: areas[1]._id,
    },
    {
      inventoryCode: 'INV-003',
      serialNumber: null,
      productTypeId: productTypes[1]._id,
      modelId: models[0]._id,
      purchaseDate: new Date('2023-11-15'),
      status: 'active',
      assignedTo: areas[2]._id,
    },
    {
      inventoryCode: 'INV-004',
      serialNumber: 'SN-004',
      productTypeId: productTypes[2]._id,
      modelId: models[3]._id,
      purchaseDate: new Date('2022-09-01'),
      status: 'retired',
      assignedTo: areas[3]._id,
    },
    {
      inventoryCode: 'INV-005',
      serialNumber: 'SN-005',
      productTypeId: productTypes[2]._id,
      modelId: models[4]._id,
      purchaseDate: new Date('2024-02-02'),
      status: 'active',
      assignedTo: areas[4]._id,
    },
    {
      inventoryCode: 'INV-006',
      serialNumber: null,
      productTypeId: productTypes[1]._id,
      modelId: models[0]._id,
      purchaseDate: new Date('2024-05-05'),
      status: 'active',
      assignedTo: areas[5]._id,
    },
    {
      inventoryCode: 'INV-007',
      serialNumber: 'SN-007',
      productTypeId: productTypes[0]._id,
      modelId: models[5]._id,
      purchaseDate: new Date('2023-07-07'),
      status: 'lost',
      assignedTo: areas[0]._id,
    },
    {
      inventoryCode: 'INV-008',
      serialNumber: 'SN-008',
      productTypeId: productTypes[1]._id,
      modelId: models[0]._id,
      purchaseDate: new Date('2023-02-14'),
      status: 'disposed',
      assignedTo: areas[1]._id,
    },
  ]);

  await productAttributeValueModel.insertMany([
    { productId: products[0]._id, attributeId: attributes[0]._id, valueNumber: 16 },
    { productId: products[0]._id, attributeId: attributes[1]._id, valueString: 'Intel i5' },
    { productId: products[1]._id, attributeId: attributes[0]._id, valueNumber: 8 },
    { productId: products[1]._id, attributeId: attributes[1]._id, valueString: 'Intel i7' },
    { productId: products[2]._id, attributeId: attributes[3]._id, valueDate: new Date('2023-11-15') },
    { productId: products[2]._id, attributeId: attributes[4]._id, valueEnum: attributeOptions[0].value },
    { productId: products[3]._id, attributeId: attributes[0]._id, valueNumber: 32 },
    { productId: products[3]._id, attributeId: attributes[4]._id, valueEnum: attributeOptions[1].value },
    { productId: products[4]._id, attributeId: attributes[0]._id, valueNumber: 16 },
    { productId: products[5]._id, attributeId: attributes[3]._id, valueDate: new Date('2024-05-05') },
    { productId: products[6]._id, attributeId: attributes[0]._id, valueNumber: 12 },
    { productId: products[6]._id, attributeId: attributes[1]._id, valueString: 'Intel i3' },
    { productId: products[7]._id, attributeId: attributes[3]._id, valueDate: new Date('2023-02-14') },
  ]);

  const parts = await partModel.insertMany([
    { name: 'Cable de poder', code: 'CABLE-PWR', partType: 'accessory' },
    { name: 'Bateria', code: 'BAT-01', partType: 'spare_part' },
    { name: 'Toner', code: 'TONER-01', partType: 'consumable' },
    { name: 'Teclado', code: 'KB-01', partType: 'spare_part' },
    { name: 'Mouse', code: 'MOUSE-01', partType: 'accessory' },
    { name: 'Cartucho', code: 'CART-01', partType: 'consumable' },
  ]);

  await productPartModel.insertMany([
    { productId: products[0]._id, partId: parts[0]._id, status: 'assigned' },
    { productId: products[0]._id, partId: parts[4]._id, status: 'assigned' },
    { productId: products[2]._id, partId: parts[2]._id, status: 'consumed' },
    { productId: products[2]._id, partId: parts[5]._id, status: 'in_stock' },
  ]);

  await problemTypeModel.insertMany([
    {
      productTypeId: productTypes[0]._id,
      name: 'No enciende',
      description: 'El equipo no enciende',
    },
    {
      productTypeId: productTypes[0]._id,
      name: 'Pantalla rota',
      description: 'Daño en pantalla',
    },
    {
      productTypeId: productTypes[1]._id,
      name: 'Atasco de papel',
      description: 'No imprime por atasco',
    },
    {
      productTypeId: productTypes[2]._id,
      name: 'No inicia sistema',
      description: 'Problema de arranque',
    },
  ]);

  await ticketModel.insertMany([
    {
      folio: 'TKT-0001',
      productId: products[0]._id,
      reportedBy: users[3]._id,
      problemType: 'No enciende',
      problemDescription: 'El equipo no responde',
      status: 'abierto',
    },
    {
      folio: 'TKT-0002',
      productId: products[1]._id,
      reportedBy: users[2]._id,
      problemType: 'Pantalla rota',
      problemDescription: 'Pantalla con fisuras',
      status: 'en_proceso',
      assignedTo: users[2]._id,
      assignedAt: new Date(),
    },
    {
      folio: 'TKT-0003',
      productId: products[2]._id,
      reporterName: 'Juan Perez',
      reporterContact: 'juan@mail.com',
      problemType: 'Atasco de papel',
      problemDescription: 'La impresora atasca papel',
      status: 'pendiente',
      assignedTo: users[2]._id,
      assignedAt: new Date(),
    },
    {
      folio: 'TKT-0004',
      productId: products[3]._id,
      reportedBy: users[1]._id,
      problemType: 'No inicia sistema',
      problemDescription: 'No arranca',
      status: 'cerrado',
      assignedTo: users[2]._id,
      assignedAt: new Date(),
      closedAt: new Date(),
      resolution: {
        failureCause: 'Disco dañado',
        negligence: false,
        replacedParts: ['Disco SSD'],
        evidenceImage: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg',
        resolvedAt: new Date(),
      },
    },
    {
      folio: 'TKT-0005',
      productId: products[4]._id,
      reportedBy: users[0]._id,
      problemType: 'No enciende',
      problemDescription: 'Sin energía',
      status: 'cancelado',
    },
  ]);

  await app.close();
}

bootstrap();
