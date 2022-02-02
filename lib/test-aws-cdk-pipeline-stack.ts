import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class TestAwsCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    console.log('codestar connection', process.env.CODESTAR_CONNECTION)

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'jk-test-pipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('JohannesKonings/test-aws-cdk-pipeline', 'main', {
          connectionArn: process.env.CODESTAR_CONNECTION as string
        }),
        // input: CodePipelineSource.gitHub('JohannesKonings/test-aws-cdk-pipeline', 'main'),
        commands: ['npm install', 'npm run build', 'npx cdk synth']
      })
    });
  }
}
