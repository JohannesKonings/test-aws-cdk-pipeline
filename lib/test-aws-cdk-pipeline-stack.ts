import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { MyPipelineAppStage } from './pipeline-app';

export class TestAwsCdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      crossAccountKeys: true,
      pipelineName: 'jk-test-pipeline',
      selfMutation: false,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('JohannesKonings/test-aws-cdk-pipeline', 'main', {
          connectionArn: process.env.CODESTAR_CONNECTION as string
        }),
        commands: ['npm install', 'npm run build', 'npx cdk synth']
      })
    });

    pipeline.addStage(new MyPipelineAppStage(this, "test", {

    }));

  }
}
