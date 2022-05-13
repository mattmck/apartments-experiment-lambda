import type { AWS } from '@serverless/typescript';

import { getAllApartments, createApartment, updateApartment, getApartment, deleteApartment } from '@functions/apartments'

const serverlessConfiguration: AWS = {
    service: 'apartments-experiment-lambda',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
            APARTMENTS_TABLE: '${self:custom.apartmentsTableName}'
        },
        iam: {
            role: {
                statements: [{
                    Effect: "Allow",
                    Action: [
                        "dynamodb:DescribeTable",
                        "dynamodb:Query",
                        "dynamodb:Scan",
                        "dynamodb:GetItem",
                        "dynamodb:PutItem",
                        "dynamodb:UpdateItem",
                        "dynamodb:DeleteItem",
                    ],
                    Resource: { 'Fn::GetAtt': ['ApartmentsTable', 'Arn']}
                }],
            },

        },
    },
    // import the function via paths
    functions: { getAllApartments, createApartment, updateApartment, getApartment, deleteApartment },
    package: { individually: true },
    custom: {
        apartmentsTableName: 'apartments-table-${sls:stage}',
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
        dynamodb: {
            start: {
                port: 8000,
                inMemory: true,
                migrate: true,
            },
            stages: "dev",
            migration: {
                dir: 'offline/migrations'
            },
            seed: {
                domain: {
                    sources: {
                        table: '${self:custom.apartmentsTableName}',
                        sources: [ './offline/seed/apartments-no-nominatim.json' ]
                    }
                }
            }
        }
    },
    resources: {
        Resources: {
            ApartmentsTable: {
                Type: "AWS::DynamoDB::Table",
                Properties: {
                    TableName: "${self:custom.apartmentsTableName}",
                    AttributeDefinitions: [{
                        AttributeName: "apartmentsId",
                        AttributeType: "S",
                    }],
                    KeySchema: [{
                        AttributeName: "apartmentsId",
                        KeyType: "HASH"
                    }],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    },

                }
            }
        }
    }
};

module.exports = serverlessConfiguration;